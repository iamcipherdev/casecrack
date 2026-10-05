import { CASES } from "@/data/cases";
import CaseClient from "./CaseClient";

export function generateStaticParams() {
  return CASES.map((c) => ({ id: c.id }));
}

export default async function CasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CaseClient id={id} />;
}
