import { Request, Response } from 'express';
import { INTERACTION, Interaction } from '../models/interaction.model';
import { Article } from '../models/article.model';

const INTERACTION_CTRL: any = {};

INTERACTION_CTRL.doInteraction = async (req: Request, res: Response) => {

  const body: INTERACTION = req.body;

  if (body.value == undefined || body.type == undefined || body.user == undefined) {
    return res.status(400).json({
      ok: false,
      message: 'Interaction need Value, Type and User',
    });
  }

  Interaction.findOne(
    {
      article: body.article,
      user: body.user,
      type: body.type
    }, {}, (async (err, int) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error searching Interaction',
        err
      });
    }

    if (!int) {
      const interaction = new Interaction(body);
      interaction.save((err) => {
        if (err) {
          return res.status(409).json({
            ok: false,
            message: 'Error creating Interaction',
            err
          });
        }
      });
      } else {
       await Interaction.updateOne({_id: int._id}, {$set:{value: body.value} }, (err) => {
        if (err) {
          return res.status(409).json({
            ok: false,
            message: 'Error updating Interaction',
            err
          });
        }
      });
    }

    const updated = await updateArticle(body);

    if (updated) {
      res.status(201).json({
        ok: true,
        message: 'Article Updated'
      });
    } else {
      res.status(500).json({
        ok: false,
        message: 'Error updating Article',
        err
      });
    }
  }));
};

const updateArticle = (body: INTERACTION): Promise<boolean> => {
  return new Promise((res, rej) => {
    if (body.type === 'like') {
      Article.updateOne({ _id: body.article },
        {$inc:{likes: body.value}}, (err) => { err ? rej() : res(true); });

    } else if (body.type === 'star') {
      Interaction.find({ article: body.article, type: body.type }, {}, (async (err, int) => {

      if (err) { rej(); }
      let avg: number = 0;
      let total: number = 0;

      if (int.length > 0) {
        int.forEach((i: INTERACTION) => {
          total += i.value;
        });
        avg = Math.floor(total / int.length);
      } else { avg = body.value }

      if (avg) {
        Article.updateOne({_id: body.article}, {$set:{ stars: avg }}, (err) => {
          if (err) { rej(); }
          res(true);
        });
      }
     }));
    }
  });
}

INTERACTION_CTRL.getInteractionByUser = async (req: Request, res: Response) => {

  const id = req.user._id;

  Interaction.find({user: id}, {}, (err, interaction) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error searching Interaction',
        err
      });
    }

    if (interaction.length > 0) {
      return res.status(200).json({
        ok: true,
        message: 'Intersection by User',
        interaction
      });
    }
    res.end();
  });
};

export default INTERACTION_CTRL;