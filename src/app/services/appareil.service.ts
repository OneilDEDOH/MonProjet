import { Subject } from '../../../node_modules/rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
// import { HttpClient } from '../../../node_modules/@types/selenium-webdriver/http';

@Injectable()
export class AppareilService {

  appareilSubject = new Subject<any[]>();

  private appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'allumé'
    },
    {
      id: 2,
      name: 'Télévision',
      status: 'allumé'
    },
    {
      id: 3,
      name: 'Ordinateur',
      status: 'éteint'
    },
    {
      id: 4,
      name: 'Imprimante',
      status: 'éteint'
    }
  ];
  httpClient: any;

  constructeur(private http: HttpClient) {}

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  switchOnAll() {
      for (const appareil of this.appareils) {
          appareil.status = 'allumé';
      }
      this.emitAppareilSubject();
  }

  switchOffAll() {
      for (const appareil of this.appareils) {
          appareil.status = 'éteint';
      }
      this.emitAppareilSubject();
  }

  switchOnOne(index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(index: number) {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;

    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilToServer() {
    this.httpClient
                  .put('http-client-demo-37669/appareils.json', this.appareils)
                  .subscribe(
                    () => {
                      console.log('Enregistrement Terminé. :)');
                    },
                    (error) => {
                      console.log('Erreur de Sauvegarde!!! \n' + error);
                    }
                  );
  }

  getAppareilsFromServer() {
    this.httpClient
                  .get<any[]> (url: 'http-client-demo-37669/appareils.json')
                  .subscribe(
                    (Response) => {
                      this.appareils = Response;
                      this.emitAppareilSubject();
                    },
                    (error) => {
                      console.log('Erreur de Sauvegarde!!! \n' + error);
                    }
                  );
  }

}
