import { Request, Response } from 'express';
import { Category, CATEGORY } from '../models/category.model';

const CATEGORY_CTRL: any = {};

// GET
CATEGORY_CTRL.getCategories = async (req: Request, res: Response) => {

  const categories = await Category.find({}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Categories",
        err
      });
    }
  }).populate('user').sort({_id: -1});

  res.status(200).json({
    ok: true,
    message: 'Categories',
    categories
  });
}

CATEGORY_CTRL.getCategoryById = async (req: Request, res: Response) => {

  const id = req.params.id;

  await Category.find({ _id: id }, {}, (err, category) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error loading Category by Id',
        err
      });
    }

    if (!category) {
      return res.status(400).json({
        ok: false,
        message: "Category with Id " + id + " doesn't exist",
      });
    }

    res.status(200).json({
      ok: true,
      message: 'Category by Id',
      category
    });
  });
}

// CREATE
CATEGORY_CTRL.addCategory = async (req: Request, res: Response) => {

  const body: CATEGORY = req.body;

  if (body.title == '' || body.message == '') {
    return res.status(400).json({
      ok: false,
      message: 'Category needs Title and Message',
    });
  }

  Category.create(body).then(category => {
    res.status(201).json({
      ok: true,
      message: 'Category created',
      category
    });
  }).catch(err => {
    return res.status(500).json({
      ok: false,
      message: 'Error creating Category',
      err
    });
  });
}

// UPDATE
CATEGORY_CTRL.updateCategory = async (req: Request, res: Response) => {

  const body: CATEGORY = req.body;
  const id = req.params.id;

  if (body.title == '' || body.message == '') {
    return res.status(400).json({
      ok: false,
      message: "Category needs Title, Message",
    });
  }

  Category.findByIdAndUpdate(id, body, { new: true }, (err, category) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error updating Category',
        err
      });
    }

    if (!category) {
      return res.status(400).json({
        ok: false,
        message: "Category with Id " + id + " doesn't exist",
      });
    }

    res.status(201).json({
      ok: true,
      message: 'Category updated',
      category
    });
  });
}

// DELETE
CATEGORY_CTRL.deleteCategoryById = async (req: Request, res: Response) => {

  const id = req.params.id;

  Category.findOneAndRemove({ _id: id }, (err, category) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error Deleting Category',
        err
      });
    }

    if (!category) {
      return res.status(400).json({
        ok: false,
        message: "Category with Id " + id + " doesn't exist",
      });
    }

    res.status(202).json({
      ok: true,
      message: 'Category Deleted',
      category: category
    });
  });
};

export default CATEGORY_CTRL;