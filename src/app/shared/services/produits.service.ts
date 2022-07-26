import { Produits } from 'src/app/shared/models/produits';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { pipe,map ,tap, BehaviorSubject} from "rxjs";
import { Catalogue } from '../models/catalogue';



@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  
  private url:string = "http://localhost:8000/api/catalogue"

  constructor(private http:HttpClient){ }
      all(): Observable<Catalogue> {
          return this.http.get<any>(this.url).pipe(
          map(
            data=>{
                let catalogue:Catalogue={
                  burgers:data["hydra:member"][0].burger,
                  menus:data["hydra:member"][1].menu,
                  combiner: [...data["hydra:member"][0].burger,...data["hydra:member"][1].menu],
                 
                }
                
              return catalogue
      }
     )
    )
  }

  produits$ = (id:number) => {
    return this.http.get<Catalogue>(`${this.url}/${id}`)
  }

  

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();



  changeMessage(message:string) {
    this.messageSource.next(message)
  }

}
