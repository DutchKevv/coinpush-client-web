import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRouter } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { CustomHttp } from './services/http.service';
import { AlertComponent } from './components/alert/alert.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserOverviewComponent } from './components/user-overview/user.overview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BootstrapService } from "./services/bootstrap.service";
import { EventOverviewComponent } from './components/event-overview/event-overview.component';
import { AlarmMenuActiveSymbolEventPipe } from './components/alarm-menu/alarm-menu.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { FilterIFavoritePipe } from './components/instrument-list/instrument-list.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { ModalComponent } from './components/modal/modal.component';
import { HeaderComponentModule } from './components/header/header.component.module';
import { NormalizeImageUrlPipeModule } from './pipes/normalize-image.pipe.module';
import { NavigationMenuComponentModule } from './components/navigation-menu/navigation-menu.component.module';
import { SocialFeedComponentModule } from './components/social-feed/social-feed.component.module';
import { ChartOverviewComponentModule } from './components/chart-overview/chart-overview.component.module';
import { UserOverviewComponentModule } from './components/user-overview/user-overview.component.module';

@NgModule({
	declarations: [
		AppComponent,
		EventOverviewComponent,
		FilterIFavoritePipe,
		AlertComponent,
		ProfileComponent,
		SettingsComponent,
		TimelineComponent,
		AlarmMenuActiveSymbolEventPipe
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRouter,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		MatDialogModule,
		HeaderComponentModule,
		NavigationMenuComponentModule,
		SocialFeedComponentModule,
		ChartOverviewComponentModule,
		UserOverviewComponentModule,
		NormalizeImageUrlPipeModule
	],
	providers: [
		{ provide: APP_INITIALIZER, useFactory: (config: BootstrapService) => () => config.load(), deps: [BootstrapService], multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: CustomHttp, multi: true },
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
				hasBackdrop: true,
				closeOnNavigation: true,
				autoFocus: false,
				disableClose: true
			}
		},
	],
	bootstrap: [
		AppComponent
	],

	entryComponents: [LoginComponent, ModalComponent]
})

export class AppModule {
}