import { Pipe, PipeTransform } from "@angular/core";

const MAX_COMMENT_LENGTH = 400;

@Pipe({ 
    name: 'parseCommentContent' 
})
export class ParseCommentContentPipe implements PipeTransform {
	transform(value: string, field: string): string {
		value = linkify(value);

		if (value.length > MAX_COMMENT_LENGTH)
			return value.substring(0, MAX_COMMENT_LENGTH) + ' ...';

		return value;
	}
}

export function linkify(inputText: string): string {
    let replacedText: string, 
        replacePattern1: RegExp, 
        replacePattern2: RegExp, 
        replacePattern3: RegExp;

	//URLs starting with http://, https://, or ftp://
	replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank" class="g-link">$1</a>');

	//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
	replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
	replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank" class="g-link">$2</a>');

	//Change email addresses to mailto:: links.
	replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
	replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1" class="g-link">$1</a>');

	return replacedText;
}