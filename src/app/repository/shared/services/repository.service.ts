import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkService } from 'src/app/shared/services/network.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class RepositoryService extends NetworkService {
  constructor(http: HttpClient) {
    super(http);
  }

  getRepositories(): Observable<any> {
    const url = 'https://api.github.com/user/repos';
    return this.getRequest(url, {
      headers: {
        Authorization: 'Bearer ' + this.access_token,
      },
    });
  }

  getStarredRepositories(): Observable<any> {
    return this.getRequest('https://api.github.com/user/starred', {
      headers: {
        Authorization: 'Bearer ' + this.access_token,
      },
    });
  }

  getSubscribedRepositories(): Observable<any> {
    return this.getRequest('https://api.github.com/user/subscriptions', {
      headers: {
        Authorization: 'Bearer ' + this.access_token,
      },
    });
  }

  getIssues(owner: string, repository_name: string): Observable<any> {
    const url = `https://api.github.com/repos/${owner}/${repository_name}/issues`;
    return this.getRequest(url, {
      headers: {
        Authorization: 'Bearer ' + this.access_token,
      },
    });
  }

  starRepository(owner: string, repository_name: string): Observable<any> {
    const url = `https://api.github.com/user/starred/${owner}/${repository_name}`;
    return this.putRequest(
      url,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + this.access_token,
        },
      }
    );
  }

  unstarRepository(owner: string, repository_name: string): Observable<any> {
    const url = `https://api.github.com/user/starred/${owner}/${repository_name}`;
    return this.deleteRequest(url, {
      headers: {
        Authorization: 'Bearer ' + this.access_token,
      },
    });
  }

  subscribeRepository(owner: string, repository_name: string): Observable<any> {
    const url = `https://api.github.com/repos/${owner}/${repository_name}/subscription`;
    return this.putRequest(
      url,
      {
        ignored: false,
        subscribed: true,
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.access_token,
        },
      }
    );
  }

  unsubscribeRepository(
    owner: string,
    repository_name: string
  ): Observable<any> {
    const url = `https://api.github.com/repos/${owner}/${repository_name}/subscription`;
    return this.deleteRequest(url, {
      headers: {
        Authorization: 'Bearer ' + this.access_token,
      },
    });
  }
}