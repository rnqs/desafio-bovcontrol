import axios from 'axios'

export interface ApiChecklistItem {
  _id?: number | string,
  id?: number | string,
  type: string,
  amount_of_milk_produced: number,
  farmer: {
    name: string,
    city: string
  },
  from: {
    name: string
  },
  to: {
    name: string
  },
  number_of_cows_head: number,
  had_supervision: boolean,
  location: {
    latitude: number,
    longitude: number
  },
  created_at: Date,
  updated_at: Date,
  __v?: number
}

export const api = axios.create({
  baseURL: 'http://challenge-front-end.bovcontrol.com/v1/'
})
