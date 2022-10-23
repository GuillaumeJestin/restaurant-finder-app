import FSQ_Category from "./FSQ_Category";
import FSQ_Geocode from "./FSQ_Geocode";
import FSQ_Location from "./FSQ_Location";

// Some attributes that are not used have been left out of this type definition

type FSQ_Place = {
  fsq_id: string;
  categories: FSQ_Category[];
  description: string;
  distance: number;
  email: string;
  features: any;
  geocodes: {
    main: FSQ_Geocode;
    roof: FSQ_Geocode;
  };
  hours: {
    display: string;
    is_local_holiday: boolean;
    open_now: boolean;
    regular: {
      close: string;
      day: number;
      open: string;
    }[];
    seasonal: {
      closed: boolean;
      end_date: string;
      hours: {
        close: string;
        day: number;
        open: string;
      }[];
      start_date: string;
    }[];
  };
  link: string;
  location: FSQ_Location;
  menu?: string;
  name: string;
  popularity: number;
  price: number;
  rating?: number;
  social_media: {
    facebook_id?: string;
    instagram?: string;
    twitter?: string;
  };
  tel: string;
  website: string;
};

export default FSQ_Place;