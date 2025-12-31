import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './firebase.service';

@Global() // Available everywhere without importing
@Module({
  imports: [ConfigModule],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
