import { Injectable } from '@angular/core';
import { ApiService } from './global/api.service';
import { Observable } from 'rxjs';
import { SliderItem } from '../models/sliderItem';

@Injectable({
  providedIn: 'root'
})
export class SliderItemsService {

  constructor(private apiService: ApiService) { }

  getSliderItem(sliderItemId: number): Observable<SliderItem> {
    return this.apiService.get<SliderItem>(`SliderItems/${sliderItemId}`);
  }

  getSliderItems(sliderId: number): Observable<SliderItem[]> {
    return this.apiService.get<SliderItem[]>(`SliderItems/slider/${sliderId}`);
  }

  createSliderItem(sliderItem: SliderItem): Observable<SliderItem> {
    return this.apiService.post<SliderItem, SliderItem>('SliderItems', sliderItem);
  }

  updateSliderItem(sliderItemId: number, sliderItem: SliderItem): Observable<any> {
    return this.apiService.put(`SliderItems/${sliderItemId}`, sliderItem);
  }

  deleteSliderItem(sliderItemId: number): Observable<any> {
    return this.apiService.delete(`SliderItems/${sliderItemId}`);
  }
}