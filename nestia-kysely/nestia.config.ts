import { INestiaConfig } from '@nestia/sdk';

const config: INestiaConfig = {
  input: 'src/**/*.controller.ts',
  swagger: {
    output: 'src/config/swagger/swagger.json',
  },
};
export default config;
