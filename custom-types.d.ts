declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.gif";
declare module "stylis-plugin-rtl" {
  const noTypesYet: any;
  export default noTypesYet;
}
declare module "@mailchimp/mailchimp_marketing" {
  type Config = {
    apiKey?: string;
    accessToken?: string;
    server?: string;
  };

  type SetListMemberOptions = {
    skipMergeValidation: boolean;
  };

  export type SetListMemberBody = {
    email_address: string;
    status_if_new:
      | "subscribed"
      | "unsubscribed"
      | "cleaned"
      | "pending"
      | "transactional";
    merge_fields?: { [key: string]: any };
  };

  export default {
    setConfig: (config: Config) => {},
    lists: {
      setListMember: (
        listId: string,
        subscriberHash: string,
        body: SetListMemberBody,
        opts?: SetListMemberOptions
      ): Promise<void> => {},
      addListMember: (
        listId: string,
        options: { email_address: string; status: string }
      ): Promise<void> => {},
    },
  };
}
