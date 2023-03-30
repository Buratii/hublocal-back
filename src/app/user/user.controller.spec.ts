import { Test, TestingModule } from '@nestjs/testing';
import { SaveUserDto } from './dto/save-user.dto';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('save', () => {
    it('should save a new user with success', async () => {
      const body: SaveUserDto = {
        name: 'John Doe',
        email: 'john.doe@hotmail.com',
        password: '123456789',
      };

      const userEntityMock = { ...body } as UserEntity;

      jest.spyOn(userService, 'save').mockResolvedValueOnce(userEntityMock);

      const result = await userController.save(body);

      expect(result).toBeDefined();
      expect(userService.save).toBeCalledTimes(1);
    });
  });
});
