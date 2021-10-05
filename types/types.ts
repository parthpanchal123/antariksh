export interface search_props {
  error: string;
  image_list: image_list_type[];
}

export interface iotd_props {
  error: string;
  img_data: {
    url: string;
    copyright: string;
    title: string;
    explanation: string;
    hdurl: string;
  };
}

export interface iss_props {
  error: string;
  people_in_space: Person;
}

export interface specific_image_props {
  error: string;
  more_data: {
    title: string;
    description: string;
    secondary_creator: string;
    nasa_id: string;
    date_created: string;
    keywords: string;


  };
  image_list: image_list_type[];
}

interface Person {
  number: number;
  people: [
    {
      name: string;
    }
  ];
}

export interface image_list_type {
  data: DataEntity[];
  links: LinksEntity[];
  href: string;
}
export interface DataEntity {
  description: string;
  center: string;
  nasa_id: string;
  title: string;
  date_created: string;
  keywords?: string[] | null;
  media_type: string;
}
export interface LinksEntity {
  render?: string | null;
  rel: string;
  href: string;
}
