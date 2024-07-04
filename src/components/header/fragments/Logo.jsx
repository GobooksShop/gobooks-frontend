import { Link } from 'react-router-dom';
import logoLight from './logoLight.png';

export function Logo() {
  return (
      <Link to="/">
        <img
            src={logoLight}
            alt="GoBooks 로고"
            style={{width: 200, height: "auto"}}
        />
      </Link>
  );
}
