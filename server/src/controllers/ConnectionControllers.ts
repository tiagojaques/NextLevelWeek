import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConnectionControllers {
  async index(request: Request, response: Response) {
    // eslint-disable-next-line prettier/prettier
    const TotalConnection = await db('connections')
    .count('* as Total');
    const { Total } = TotalConnection[0];
    return response.json({ Total });
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    const trx = await db.transaction();

    try {
      await trx('connections').insert({
        user_id,
      });

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new connections',
      });
    }
  }
}
