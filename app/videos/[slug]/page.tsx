import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { mitgliedPflicht } from "@/lib/auth/sitzung";
import { videoFuerMitglied } from "@/lib/videos";
import { CodeFormular } from "../CodeFormular";
import { Anleitung } from "./Anleitung";

export const dynamic = "force-dynamic";

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mitglied = await mitgliedPflicht(`/videos/${slug}`);
  const video = await videoFuerMitglied(slug, mitglied.id);
  if (!video) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/videos" className="inline-flex items-center gap-1 text-sm text-dark-400 hover:text-gold-400 mb-8">
        <ChevronLeft className="w-4 h-4" /> Meine Bibliothek
      </Link>
      <h1 className="font-display text-3xl font-bold text-dark-50 mb-6 text-balance">{video.titel}</h1>

      {video.frei ? (
        <div className="space-y-10">
        {video.datei && <video
          controls
          playsInline
          preload="metadata"
          controlsList="nodownload"
          className="w-full rounded-2xl border border-white/10 bg-black aspect-video"
          src={`/api/video/${video.slug}`}
        />}
        {video.anleitung && <Anleitung text={video.anleitung} />}
        </div>
      ) : (
        <CodeFormular gross />
      )}

      {video.beschreibung && <p className="text-dark-300 leading-relaxed mt-8 max-w-prose whitespace-pre-line">{video.beschreibung}</p>}
    </div>
  );
}
