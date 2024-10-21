import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

import KontaktEmail from '@/emails/KontaktEmail';
import { KontaktFormularProperties } from '@/Kontakt/KontaktFormular';

const resend = new Resend(process.env.RESEND_API_KEY);

const send = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, message } = req.body as KontaktFormularProperties;
    try {
      const { data } = await resend.emails.send({
        from: 'no-reply@saba-art.com',
        to: ['alperkuertuel@hotmail.de'],
        subject: `Neue Kontaktanfrage von ${name}`,
        react: KontaktEmail({ name, email, message }),
      });

      // just mentioned that resend responeses with null when send data is incorrect
      if (!data) {
        return res.status(500).json({
          message: 'Response data from resend is null.',
        });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    return res.status(405).json({
      message:
        '405 METHOD NOT ALLOWED: Something went wrong with your request!',
    });
  }
};
export default send;
