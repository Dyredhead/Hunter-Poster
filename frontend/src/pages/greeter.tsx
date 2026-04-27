import './greeter.css';
import BigTitle from '@/components/BigTitle';
import BigButton from '@/components/BigButton';
import Screen from '@/components/Screen';

export default function GreeterPage() {
  return (
    <Screen>
      <BigTitle>
        Hunter
        <br />
        Poster
      </BigTitle>
      <div className="greeter-actions">
        <BigButton to="/auth/login">Login</BigButton>
        <BigButton to="/auth/register">Register</BigButton>
      </div>
    </Screen>
  );
}
