"use client";

import { useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  Database,
  FileSearch,
  Loader2,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";

type FormData = {
  hospital: string;
  convenio: string;
  cid: string;
  procedimento: string;
  valor_glosado: string;
  motivo: string;
};

type ResultadoAnalise = {
  categoria: string;
  prioridade: string;
  chance_recuperacao: number;
  recomendacao: string;
  fonte: string;
  evidencia: string;
};

const initialFormData: FormData = {
  hospital: "",
  convenio: "",
  cid: "",
  procedimento: "",
  valor_glosado: "",
  motivo: "",
};

export default function AnalisarGlosaPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [resultado, setResultado] = useState<ResultadoAnalise | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  function updateField(field: keyof FormData, value: string) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function analisarCaso(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErro("");
    setResultado(null);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

      const response = await axios.post<ResultadoAnalise>(
        `${apiUrl}/api/glosa/analisar`,
        {
          hospital: formData.hospital,
          convenio: formData.convenio,
          cid: formData.cid,
          procedimento: formData.procedimento,
          valor_glosado: Number(formData.valor_glosado),
          motivo: formData.motivo,
        }
      );

      setResultado(response.data);
    } catch {
      setErro(
        "Não foi possível analisar o caso. Verifique se o backend FastAPI está rodando na porta 8000."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,92,169,0.30),transparent_35%),radial-gradient(circle_at_top_left,rgba(155,155,155,0.16),transparent_30%)]" />

        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para página inicial
          </a>

          <img
            src="/brand/banner-elos.png"
            alt="Elos Consultoria e Gestão Financeira Hospitalar"
            className="hidden h-auto w-[360px] object-contain md:block"
          />
        </header>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-10">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/10 px-4 py-2 text-sm text-blue-200">
              <Brain className="h-4 w-4" />
              Módulo funcional de análise de glosas
            </div>

            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Análise inteligente de glosas hospitalares.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Informe os dados do caso para classificar a glosa, estimar a
              chance de recuperação e gerar uma recomendação inicial para apoio
              ao recurso técnico.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_0.9fr]">
        <form
          onSubmit={analisarCaso}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-300/10">
              <FileSearch className="h-6 w-6 text-blue-300" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Dados do caso</h2>
              <p className="mt-1 text-sm text-slate-400">
                Preencha as informações principais da glosa.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Hospital ou Clínica"
              value={formData.hospital}
              onChange={(value) => updateField("hospital", value)}
              placeholder="Ex.: Hospital Santa Clara"
            />

            <Input
              label="Convênio"
              value={formData.convenio}
              onChange={(value) => updateField("convenio", value)}
              placeholder="Ex.: Unimed"
            />

            <Input
              label="CID"
              value={formData.cid}
              onChange={(value) => updateField("cid", value)}
              placeholder="Ex.: I21"
            />

            <Input
              label="Procedimento"
              value={formData.procedimento}
              onChange={(value) => updateField("procedimento", value)}
              placeholder="Ex.: Cateterismo"
            />

            <Input
              label="Valor Glosado"
              value={formData.valor_glosado}
              onChange={(value) => updateField("valor_glosado", value)}
              placeholder="Ex.: 4500"
              type="number"
            />

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Motivo da Glosa
              </label>
              <textarea
                required
                value={formData.motivo}
                onChange={(event) => updateField("motivo", event.target.value)}
                placeholder="Ex.: Ausência de documentação complementar"
                className="min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-300"
              />
            </div>
          </div>

          {erro && (
            <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#005CA9] px-7 py-4 font-semibold text-white transition hover:bg-[#1E73BE] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Analisando caso...
              </>
            ) : (
              <>
                Analisar Caso
                <Brain className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-300/10">
              <ShieldCheck className="h-6 w-6 text-blue-300" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Resultado da análise</h2>
              <p className="mt-1 text-sm text-slate-400">
                Retorno gerado pela API FastAPI.
              </p>
            </div>
          </div>

          {!resultado ? (
            <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center">
              <p className="text-slate-400">
                O resultado aparecerá aqui após o envio do formulário.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <ResultCard label="Categoria" value={resultado.categoria} />
              <ResultCard label="Prioridade" value={resultado.prioridade} />
              <ResultCard
                label="Chance de Recuperação"
                value={`${resultado.chance_recuperacao}%`}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <InfoCard
                  icon={<Database className="h-5 w-5" />}
                  label="Fonte da análise"
                  value={resultado.fonte}
                />

                <InfoCard
                  icon={<SearchCheck className="h-5 w-5" />}
                  label="Evidência encontrada"
                  value={resultado.evidencia}
                />
              </div>

              <div className="rounded-3xl border border-blue-300/20 bg-blue-300/10 p-5">
                <div className="mb-3 flex items-center gap-2 text-blue-200">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="font-semibold">Recomendação</p>
                </div>
                <p className="leading-7 text-slate-300">
                  {resultado.recomendacao}
                </p>
              </div>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>
      <input
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-300"
      />
    </div>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950 p-5">
      <div className="mb-3 flex items-center gap-2 text-blue-200">{icon}</div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
    </div>
  );
}