import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { AccountService } from '../account/account.service';

import * as TimeAgo2 from 'time-ago';

export interface IComment {
	_id?: string;
	mongo_id?: string;
	createUser?: any;
	createdAt?: string;
	toUser?: string;
	content?: string;
	parentId?: string;
	childCount?: number;
	children?: Array<IComment>;
	iLike?: boolean;
	likeCount?: 0;
	isNew?: boolean;
	isNews?: boolean;
	fromNow?: string;
	imgs?: Array<string>;
	data?: any;
	type?: string;
}

@Injectable({
	providedIn: 'root',
})
export class CommentService {

	constructor(
		private _http: HttpClient,
		private _accountService: AccountService
	) { }

	/**
	 * 
	 * @param toUserId 
	 * @param parentId 
	 * @param content 
	 * @param images 
	 */
	async create(toUserId = null, parentId: string = null, content: string, images: string[]): Promise<IComment> {
		const comment = <any>await this._http.post('/comment', { toUserId, parentId, content, images }).toPromise();
		const account = this._accountService.account$.getValue();

		if (!comment)
			return;

		const model: IComment = {
			...comment,
			content,
			isNew: true,
			imgs: images,
			createdAt: new Date(),
			toUser: toUserId,
			parentId,
			createUser: {
				_id: account._id,
				name: account.name,
				img: account.img,
			}
		};

		return model;
	}

	/**
	 * 
	 * @param options 
	 */
	public async findTimeline(options: { offset?: number, limit?: number, sources?: Array<any> } = {}): Promise<IComment[]> {

		const params = new HttpParams({
			fromObject: {
				offset: (options.offset || 0).toString(),
				limit: (options.limit || 10).toString(),
				sources: JSON.stringify(options.sources || undefined)
			}
		});

		const result = <Promise<IComment[]>>await this._http.get('/timeline', { params }).toPromise();

		return result
	}

	/**
	 * 
	 * @param id 
	 */
	public findById(id: string): Promise<IComment> {
		return this._http.get('/comment/' + id).toPromise();
	}

	/**
	 * 
	 * @param toUserId 
	 * @param offset 
	 * @param limit 
	 */
	async findByUserId(toUserId: string, offset: number = 0, limit: number = 5): Promise<IComment[]> {
		const params = new HttpParams({
			fromObject: {
				toUserId: toUserId.toString(),
				offset: offset.toString(),
				limit: limit.toString()
			}
		});

		return <Promise<IComment[]>>this._http.get('/comment', { params }).toPromise();
	}

	/**
	 * 
	 * @param parentId 
	 * @param offset 
	 * @param limit 
	 */
	async findChildren(parentId: string, offset: number = 0, limit: number = 5) {
		const params = new HttpParams({
			fromObject: {
				childrenOnly: 'true',
				offset: offset.toString(),
				limit: limit.toString()
			}
		});

		const result = await this._http.get('/comment/' + parentId, { params })
			.toPromise();

		return result;
	}

	/**
	 * 
	 * @param model 
	 * @param options 
	 */
	update(model: IComment, options): Observable<Response> {
		return <any>this._http.put('/comment/' + model._id, options);
	}

	/**
	 * 
	 * @param model 
	 */
	delete(model: IComment): Observable<any> {
		return <any>this._http.delete('/comment/' + model._id);
	}

	/**
	 * 
	 * @param model 
	 */
	async toggleLike(model: IComment) {
		const result = <any>await this._http.post('/comment/like/' + model._id, {})
			.toPromise();
		console.log(model, result);
		const newCount = model.likeCount + (result.body.state ? 1 : -1);
		Object.assign(model, { iLike: !!result.body.state, likeCount: newCount });
	}
}