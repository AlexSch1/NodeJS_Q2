import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';
import config from '../common/config';
import usersRepo from '../resources/users/user.memory.repository';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET_KEY,
};

export default (passport: PassportStatic): void => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await usersRepo.get(payload.userId);

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.error(e);
      }
    })
  );
};
