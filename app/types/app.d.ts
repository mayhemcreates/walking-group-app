export namespace AppTypes {
  export type user = {
    id: string;
    name: string;
    email: string;
  };

  export interface walk {
    contact: string | null;
    created_at: string | null;
    date: string;
    description: string | null;
    id: number;
    location: string | null;
    organiser: string;
    postcode: string;
  }

  type WalkWithOrganiser = {
    id: number;
    postcode: string | null;
    date: string;
    location: string | null;
    description: string | null;
    organiser: {
      id: string;
      name: string;
      email: string;
    } | null;
  };

  type WalkWithOrganiserJs = {
    id: number;
    postcode: string | null;
    date: string;
    location: string | null;
    description: string | null;
    organiser: {
      id: string;
      name: string;
      email: string;
    } | null;
  };
}
