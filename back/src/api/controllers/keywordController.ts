import express, { Request, Response, NextFunction } from 'express';
import { ValidatorResult } from 'jsonschema';
import HttpException from '../../infra/errors/HttpException';
import { IController } from '../../models/api/IController';
import { formatMissingFields } from '../../utils/error.utils';
import { validateCreateKeyword } from '../validators';
import KeywordService from '../../business/keyword/keywordService';
import { StatusCodes } from 'http-status-codes';

class KeywordController implements IController {
  public path = '/keywords';

  public router: express.Router = express.Router();
  public keywordService = new KeywordService();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post(this.path, this.createKeyword);
  }

  /**
   * @apiVersion 0.0.1
   * @api {post} /keywords
   * @apiName CreateKeyword
   * @apiGroup Keyword
   *
   * @apiParam {String} label Keyword's Label
   * @apiParam {String} color Color of the keyword
   *
   * @apiDescription Endpoint for creating a new keyword
   *
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 201 CREATED
   */
  createKeyword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validationResult: ValidatorResult = validateCreateKeyword(req.body);
      if (!validationResult.valid) {
        throw new HttpException(
          StatusCodes.BAD_REQUEST,
          'Fields missing : ' + formatMissingFields(validationResult.errors)
        );
      }
      req.context.logger.info(`Create link post ! ${JSON.stringify(req.body)}`);

      const result = await this.keywordService.createKeyword(
        req.context,
        req.body.label,
        req.body.color
      );

      res.status(StatusCodes.CREATED).send();
    } catch (error) {
      next(error);
    }
  };
}

export default KeywordController;
