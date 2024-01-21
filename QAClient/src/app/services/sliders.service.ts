import { Injectable } from '@angular/core';
import { Slider } from '../models/slider';
import { ApiService } from './global/api.service';
import { Observable } from 'rxjs';
import { CreateSliderRequest } from '../models/RequestDTOs/createSliderRequest';

@Injectable({
  providedIn: 'root'
})
export class SlidersService {

  private sliders: Slider[] = [];

  constructor(private apiService: ApiService) { }

  getSliders(): Observable<Slider[]> {
    return this.apiService.get<Slider[]>('Sliders');
  }

  createSlider(sliderData: CreateSliderRequest): Observable<Slider> {
    return this.apiService.post<Slider, CreateSliderRequest>('Sliders', sliderData);
  }
}
