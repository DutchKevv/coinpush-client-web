import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CommentService, IComment } from "../../services/comment/comment.service";
import { BehaviorSubject } from "rxjs";
import { CacheService } from '../../services/cache.service';
import { ConfigService } from '../../services/config/config.service';
import { AccountService } from '../../services/account/account.service';
import { linkify } from './pipes/parse-comment.pipe';

const SCROLL_LOAD_TRIGGER_OFFSET = 800;

export class FilterModel {
	sources = [];
	// sources = app.data.config.companyUsers.map(user => {user.enabled = true; return user});
}

@Component({
	selector: 'app-social-feed',
	styleUrls: ['./social.feed.component.scss'],
	templateUrl: 'social.feed.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialFeedComponent implements OnInit, OnDestroy, OnChanges {

	@Input() public scrollHandle: HTMLElement;
	@Input() public filterModel: FilterModel;

	public comments$: BehaviorSubject<Array<IComment>> = new BehaviorSubject([]);
	public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	public userId: string;
	public commentId: string;

	private _routeParamsSub;
	private _offset = 0;
	private _onScrollBinded = this._onScroll.bind(this);

	constructor(
		public commentService: CommentService,
		public changeDetectorRef: ChangeDetectorRef,
		public accountService: AccountService,
		private _elementRef: ElementRef,
		private _configService: ConfigService,
		private _route: ActivatedRoute,
		private _cacheService: CacheService) {
	}

	ngOnInit() {
		switch (this._route.snapshot.url[0].path) {
			case 'user':
				this.userId = this._route.snapshot.params['id'];
				break;
			case 'comment':
				this.commentId = this._route.snapshot.params['id'];
				break;
		}

		this._load();

		this.bindScroll(this.scrollHandle);
	}

	ngOnChanges(changes: SimpleChanges) {
		
	}

	public focusInput(event) {
		event.currentTarget.parentNode.parentNode.querySelector('input').focus();
	}

	public addMessage(model: IComment) {
		const current = Array.from(this.comments$.getValue());

		if (model.parentId)
			current.find(c => c._id === model.parentId).children.push(model);
		else
			current.unshift(model);

		this.comments$.next(current);
	}

	public async toggleLike(model: IComment) {
		await this.commentService.toggleLike(model);
		this.changeDetectorRef.detectChanges();
	}

	public bindScroll(scrollHandle?: HTMLElement) {
		this.scrollHandle = scrollHandle || this._elementRef.nativeElement;
		this.scrollHandle.addEventListener('scroll', this._onScrollBinded, { passive: true });
	}

	public unbindScroll() {
		if (this.scrollHandle) {
			this.scrollHandle.removeEventListener('scroll', this._onScrollBinded);
		}
	}

	public async respond(event, parentModel: IComment) {
		const input = event.currentTarget;
		input.setAttribute('disabled', true);
		const comment = await this.commentService.create(parentModel.toUser, parentModel._id, input.value, []);
		input.removeAttribute('disabled');

		if (!comment)
			return;

		parentModel.childCount++;
		input.value = '';

		this.addMessage(comment);
	}

	public onChangeFileInput(event) {

	}

	public showMorePostActions(comment: IComment) {
		console.log('more')
	}

	public showMoreCommentActions(comment: IComment) {
		console.log('more')
	}

	public trackByFn(index, item) {
		return item._id; // or item.id
	}


	public async loadMoreChildren(parentModel: IComment): Promise<void> {
		const children = <any>await this.commentService.findChildren(parentModel._id, parentModel.children.length);
		parentModel.children = children.concat(parentModel.children);
		this.changeDetectorRef.detectChanges();
	}

	public onClickShowMoreText(model: IComment, event: MouseEvent): void {
		const target = <HTMLElement>event.target;
		target.previousElementSibling.innerHTML = linkify(model.content);
		target.parentNode.removeChild(target);
	}

	public reload(): Promise<void> {
		this._offset = 0;
		this.comments$.next([]);
		return this._load();
	}

	private async _load(): Promise<void> {
		const urlPath = this._route.snapshot.url[0].path;
		let items = [];

		this.isLoading$.next(true);

		switch (urlPath) {
			case 'user':
				items = await this.commentService.findByUserId(this.userId, this._offset);
				break;
			case 'comment':
				items = [await this.commentService.findById(this.commentId)];
				break;
			default:
				// set filter options
				const options: any = {
					offset: this._offset
				};

				if (this.filterModel) {
					options.sources = this.filterModel.sources.filter(source => source.enabled).map(source => source._id);
				}

				items = await this.commentService.findTimeline(options);
		}

		this.isLoading$.next(false);

		if (!items.length) {
			this.unbindScroll();
			return;
		}

		// keep track of current offset
		// TODO: Should be timestamp!
		this._offset += items.length;

		// add 'special' comments (alerts, advertising)
		if (urlPath !== 'comment') {
			this._mixComments(items);
		}

		this.comments$.next(this.comments$.getValue().concat(items));
	}

	/**
	 * Add advertisings, alerts etc in between comments
	 * @param comments 
	 */
	private _mixComments(comments: IComment[]): void {
		let risersFallersNr = Math.floor(comments.length / 5);
		const positions = [];

		while (risersFallersNr-- > 0) {
			const randomPosition = getRandomNumber(comments.length, positions);
			positions.push(randomPosition);
			this._mixRiserFallers(comments, randomPosition);
		}

		this._mixAds(comments);
	}

	private _mixAds(comments: IComment[]): void {
		if (this._configService.platform.isApp) {
			// const banner = window['AdMob'].createBanner({
			// 	adSize: window['AdMob'].AD_SIZE.MEDIUM_RECTANGLE,
			// 	overlap: true,
			// 	// height: 60, // valid when set adSize 'CUSTOM'
			// 	adId: 'ca-app-pub-1181429338292864/6989656167',
			// 	position: window['AdMob'].AD_POSITION.BOTTOM_CENTER,
			// 	autoShow: true,
			// 	isTesting: true
			// });

			// console.log(banner);
		} else {
			const ad: IComment = {
				type: 'ad',
				content: 'DFDFDF'
			};

			comments.push(ad);

			setTimeout(() => {
				(window['adsbygoogle'] = window['adsbygoogle'] || []).push({
					google_adtest: 'on'
				});
			}, 1000);

		}
	}

	// risers and fallers
	private _mixRiserFallers(comments: IComment[], position?: number): void {
		position = position || getRandomNumber(comments.length);

		const sortedByDayAmount = this._cacheService.symbols.sort((a, b) => a.options.changedDAmount - b.options.changedDAmount);
		const risers = sortedByDayAmount.slice(-20);
		const fallers = sortedByDayAmount.slice(0, 20)
		const randomUpSymbolModel = risers[Math.floor(Math.random() * risers.length)];
		const randomDownSymbolModel = fallers[Math.floor(Math.random() * fallers.length)];

		const commentModel = {
			data: {
				symbolUpModel: randomUpSymbolModel,
				symbolDownModel: randomDownSymbolModel
			},
			type: 'intel-momentum',
			content: ''
		};

		comments.splice(position, 0, commentModel);
	}

	private _onScroll(event): void {
		if (!this.isLoading$.getValue() && event.target.scrollHeight - event.target.scrollTop - SCROLL_LOAD_TRIGGER_OFFSET <= event.target.clientHeight)
			this._load();
	}

	private _toggleLoading(state: boolean) {

	}

	ngOnDestroy() {
		this.unbindScroll();

		if (this._routeParamsSub)
			this._routeParamsSub.unsubscribe();
	}
}


const AD_ARTICLE_HTML = `
		<ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-1181429338292864"
		 data-ad-slot="5683371400"></ins>
		 `;

const AD_FEED_HTML = `
		<ins class="adsbygoogle" style="display:block;" data-ad-format="fluid" data-ad-layout-key="-6t+ed+2i-1n-4w" data-ad-client="ca-pub-1181429338292864"
		  data-ad-slot="6793790015" data-adtest="on"></ins>
		`;

function getRandomNumber(until: number, without: Array<number> = []) {
	let number: number, maxTries = 10, i = 0;

	do {
		number = Math.floor(Math.random() * until) + 1;
	} while (i++ < maxTries && without.includes(number));

	return number;
}