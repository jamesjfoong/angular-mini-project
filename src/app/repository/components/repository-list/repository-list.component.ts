import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/types/appState.model';
import * as REPOSITORY from '../../shared/store/reducers';
import { Repository } from '../../shared/types/repository.model';

@Component({
  selector: 'repository-list',
  templateUrl: './repository-list.component.html',
})
export class RepositoryListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  repositories$: Observable<any[]>;

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.pipe(select(REPOSITORY.isLoadingSelector));
    this.error$ = this.store.pipe(select(REPOSITORY.errorSelector));
    this.repositories$ = this.store.pipe(
      select(REPOSITORY.repositoriesSelector)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(REPOSITORY.getRepositories());
  }

  onSubscribed(repository: Repository) {
    if (repository.isSubscribed)
      this.store.dispatch(REPOSITORY.unsubscribeRepository({ repository }));
    else this.store.dispatch(REPOSITORY.subscribeRepository({ repository }));
  }

  onStarred(repository: Repository) {
    if (repository.isStarred)
      this.store.dispatch(REPOSITORY.unstarRepository({ repository }));
    else this.store.dispatch(REPOSITORY.starRepository({ repository }));
  }
}
