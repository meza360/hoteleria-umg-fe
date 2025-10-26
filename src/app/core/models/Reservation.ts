export interface Reservation {
  'id': string;
  'room': {
    'id': string;
    'name': string;
    'dates': Array<string>;
    'totalNights': number;
    'unitPrice': number;
  },
  'extras': Array<RoomExtras>;
  'billTo': {
    'name': string;
    'email': string;
  },
  'payment': {
    'paymentMethod': 'onPremise';
    'total': number;
  },
  'seller': {
    'id': string,
    'name': string;
  };
}

export interface RoomExtras {
  'name': string;
  'price': number;
}
