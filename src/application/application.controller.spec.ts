import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { CreateDataTutorDto } from './dto/create-dataTutor.dto';
import { UpdateStatusChildDto } from './dto/update-status.dto';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

describe('ApplicationController', () => {
  let app: INestApplication;
  let controller: ApplicationController;
  let service: ApplicationService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationController],
      providers: [
        {
          provide: ApplicationService,
          useValue: {
            findByID: jest.fn(),
            createApplication: jest.fn(),
            changeStatusApplication: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    controller = moduleRef.get<ApplicationController>(ApplicationController);
    service = moduleRef.get<ApplicationService>(ApplicationService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getByID', () => {
    it('should call service.findByID with correct id', async () => {
      const id = 1;
      const findByIDSpy = jest.spyOn(service, 'findByID').mockResolvedValue({} as any);

      const response = await request(app.getHttpServer())
        .get(`/application/${id}`)
        .expect(200);

      expect(findByIDSpy).toHaveBeenCalled();
    });
  });

  describe('uploadFiles', () => {
    it('should throw error if no files are uploaded', async () => {
      const data = { body: JSON.stringify({}) };

      await request(app.getHttpServer())
        .post('/application')
        .send({ data })
        .expect(500);
    });

    it('should call service.createApplication with correct data', async () => {
      const dataTutor: CreateDataTutorDto = { /* populate with valid data */ } as CreateDataTutorDto;
      const createApplicationSpy = jest.spyOn(service, 'createApplication').mockResolvedValue({} as any);

      await request(app.getHttpServer())
        .post('/application')
        .field('data', JSON.stringify({ body: JSON.stringify(dataTutor) }))
        .attach('files', Buffer.from('some file content'), 'file.txt')
        .expect(201);

      expect(createApplicationSpy).toHaveBeenCalled();
    });
  });

  describe('changeStatus', () => {
    it('should call service.changeStatusApplication with correct parameters', async () => {
      const id = 1;
      const changeStatus: UpdateStatusChildDto = { /* populate with valid data */ } as UpdateStatusChildDto;
      const changeStatusApplicationSpy = jest.spyOn(service, 'changeStatusApplication').mockResolvedValue({} as any);

      await request(app.getHttpServer())
        .patch(`/application/${id}`)
        .send(changeStatus)
        .expect(200);

      expect(changeStatusApplicationSpy).toHaveBeenCalledWith(id, changeStatus);
    });
  });
});
