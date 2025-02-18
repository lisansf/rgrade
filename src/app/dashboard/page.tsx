import { Metadata } from 'next';
import CDashboard from './CDashboard';

export const metadata: Metadata = {
    title: "Dashboard | Retro Grade"
}

export default function Dashboard() {
    return <CDashboard />
}