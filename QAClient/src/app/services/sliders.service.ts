import { Injectable } from '@angular/core';
import { Slider } from '../models/slider';
import { ApiService } from './global/api.service';
import { Observable } from 'rxjs';
import { CreateSliderRequest } from '../models/RequestDTOs/createSliderRequest';

@Injectable({
  providedIn: 'root'
})
export class SlidersService {

  constructor(private apiService: ApiService) { }

  getActiveSlider(): Observable<Slider> {
    return this.apiService.get<Slider>('Sliders/active');
  }

  getSliders(): Observable<Slider[]> {
    return this.apiService.get<Slider[]>('Sliders');
  }

  getSlider(sliderId: number): Observable<Slider> {
    return this.apiService.get<Slider>(`Sliders/${sliderId}`);
  }

  createSlider(sliderData: CreateSliderRequest): Observable<Slider> {
    return this.apiService.post<Slider, CreateSliderRequest>('Sliders', sliderData);
  }

  setActive(sliderId: number): Observable<any> {
    return this.apiService.put<any, null>(`Sliders/${sliderId}/set-active`, null);
  }

  deleteSlider(sliderId: number): Observable<any> {
    return this.apiService.delete(`Sliders / ${sliderId}`);
  }
}
