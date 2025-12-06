export namespace AppTypes {
  export type walk = {
    location: string;
    postcode: string;
    organiser: user;
    walkDate: Date;
    description: string;
  };

  export type user = {
    name: string;
    email: string;
  };

  export type walks = {
    walks: walk[];
  };
}
