export namespace AppTypes {
  export type organiser = {
    id: string;
    name: string;
    email: string;
  };

  export interface walk {
    contact: string | null;
    leader: string | null;
    date: string;
    description: string | null;
    id: number;
    location: string | null;
    organiser: organiser;
    postcode: string;
  }

  export interface walkObj {
    contact: string | null;
    date: string;
    description: string | null;
    location: string | null;
    organiser: string | null;
    postcode: string;
  }

  type WalkWithOrganiserJs = {
    id: number;
    contact: string | null;
    leader: string | null;
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

  type walkResult = {
    success: boolean;
    message?: string;
  };

  type Error = {
    code: string;
  };
}
