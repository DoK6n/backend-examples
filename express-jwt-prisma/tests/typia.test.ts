import typia from 'typia';
import { LoginRequestDto, RegisterRequestDto } from '../src/interfaces/user.interface.dto';

const test = {
  email: 'aa@gmail.com',
  password: '22',
  // username: 'aa',
};

// const exactAssert = typia.assert<LoginDto>(test); // 컴파일 과정에서 에러
const exactIs = typia.is<LoginRequestDto>(test); // boolean값 리턴
const exactValidate = typia.validate<LoginRequestDto>(test); //
const exactValidateEquals = typia.validateEquals<LoginRequestDto>(test); //
let random: RegisterRequestDto[] = [];

for (let i = 0; i < 10; i++) {
  random.push(typia.random<RegisterRequestDto>());
}

// console.log('[typia.assert] - ', exactAssert);
console.log('[typia.is] - ', exactIs);
console.log('[typia.validate] - ', exactValidate);
console.log('[typia.validateEquals] - ', exactValidateEquals);
console.log('[typia.random] - ', random);

/*
  [typia.is] -  false
  [typia.validate] -  {
    success: false,
    errors: [ { path: '$input.password', expected: 'string', value: '22' } ],
    data: undefined
  }
  [typia.validateEquals] -  {
    success: false,
    errors: [ { path: '$input.password', expected: 'string', value: '22' } ],
    data: undefined
  }
*/
