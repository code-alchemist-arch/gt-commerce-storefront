import mailchimp from "@mailchimp/mailchimp_marketing";
import { GET_MAILCHIMP } from "../../graphql/query/cms/mailchimp.query";
import fetcher from "../../utils/fetcher";

export default async (req, res) => {
  const data = await fetcher(GET_MAILCHIMP);
  const { api_key, server, audience_id } = data?.mailchimp;

  if (!api_key || !server || !audience_id) {
    return res.status(500).json({ error: "Internal error" });
  }

  mailchimp.setConfig({
    apiKey: api_key,
    server: server,
  });
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await mailchimp.lists.addListMember(audience_id, {
      email_address: email,
      status: "subscribed",
    });

    return res.status(201).json({ error: "" });
  } catch (error) {
    const text = error.response.body.title;
    return res.status(500).json({ error: text });
  }
};
