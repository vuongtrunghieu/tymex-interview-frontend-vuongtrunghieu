import { redirect } from 'next/navigation';

export default function Root() {
  redirect('/marketplace');

  return null;
}
