"use client";

import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  ClipboardCopy,
  Database,
  Download,
  FileSearch,
  FileUp,
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

type RecursoAdministrativo = {
  titulo: string;
  documento: string;
  categoria: string;
  prioridade: string;
  chance_recuperacao: string;
  valor_glosado_formatado: string;
  data_emissao: string;
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
  const [recurso, setRecurso] = useState<RecursoAdministrativo | null>(null);
  const [arquivoPdf, setArquivoPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [gerandoRecurso, setGerandoRecurso] = useState(false);
  const [exportandoPdf, setExportandoPdf] = useState(false);
  const [documentoCopiado, setDocumentoCopiado] = useState(false);
  const [erro, setErro] = useState("");

  function updateField(field: keyof FormData, value: string) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function selecionarArquivo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setErro("Selecione apenas arquivos PDF.");
      return;
    }

    setErro("");
    setArquivoPdf(file);
  }

  function getPayload() {
    return {
      hospital: formData.hospital,
      convenio: formData.convenio,
      cid: formData.cid,
      procedimento: formData.procedimento,
      valor_glosado: Number(formData.valor_glosado),
      motivo: formData.motivo,
    };
  }

  async function analisarCaso(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErro("");
    setResultado(null);
    setRecurso(null);
    setDocumentoCopiado(false);

    try {
      const apiUrl = "https://elos-recovery-ai-backend.onrender.com";

      const response = await axios.post<ResultadoAnalise>(
        `${apiUrl}/api/glosa/analisar`,
        getPayload()
      );

      setResultado(response.data);
    } catch {
      setErro(
        "Não foi possível analisar o caso. Não foi possível conectar ao backend em produção."
      );
    } finally {
      setLoading(false);
    }
  }

  async function gerarRecurso() {
    setGerandoRecurso(true);
    setErro("");
    setDocumentoCopiado(false);

    try {
      const apiUrl = "https://elos-recovery-ai-backend.onrender.com";

      const response = await axios.post<RecursoAdministrativo>(
        `${apiUrl}/api/glosa/gerar-recurso`,
        getPayload()
      );

      setRecurso(response.data);
    } catch {
      setErro("Não foi possível gerar o recurso administrativo.");
    } finally {
      setGerandoRecurso(false);
    }
  }

  async function exportarPdf() {
    setExportandoPdf(true);
    setErro("");

    try {
      const apiUrl = "https://elos-recovery-ai-backend.onrender.com";

      const response = await axios.post(`${apiUrl}/api/glosa/gerar-pdf`, getPayload(), {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "ELOS_Recurso_Administrativo.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch {
      setErro("Não foi possível exportar o PDF.");
    } finally {
      setExportandoPdf(false);
    }
  }

  async function copiarDocumento() {
    if (!recurso?.documento) return;

    await navigator.clipboard.writeText(recurso.documento);
    setDocumentoCopiado(true);
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

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Documento Hospitalar (PDF)
              </label>

              <div className="rounded-2xl border border-dashed border-blue-300/30 bg-slate-950 p-5">
                <div className="flex items-center gap-3 text-blue-200">
                  <FileUp className="h-5 w-5" />
                  <p className="font-medium">Anexar documento do caso</p>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Anexe prontuário, guia, autorização, conta hospitalar ou outro
                  documento de apoio em PDF.
                </p>

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={selecionarArquivo}
                  className="mt-4 block w-full text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-[#005CA9] file:px-5 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-[#1E73BE]"
                />

                {arquivoPdf && (
                  <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                    <div className="flex items-center gap-2 text-emerald-300">
                      <CheckCircle2 className="h-5 w-5" />
                      <p className="text-sm font-semibold">
                        Documento carregado
                      </p>
                    </div>

                    <p className="mt-2 text-sm text-white">{arquivoPdf.name}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {(arquivoPdf.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
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

                {arquivoPdf && (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950 p-4">
                    <p className="text-sm text-slate-400">
                      Documento de apoio anexado
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {arquivoPdf.name}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={gerarRecurso}
                  disabled={gerandoRecurso}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-blue-300/30 bg-slate-950 px-6 py-4 font-semibold text-white transition hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {gerandoRecurso ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Gerando Recurso...
                    </>
                  ) : (
                    <>
                      Gerar Recurso Administrativo
                      <ClipboardCopy className="h-5 w-5" />
                    </>
                  )}
                </button>

                <a
                  href="/dashboard"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#005CA9] px-6 py-4 font-semibold text-white transition hover:bg-[#1E73BE]"
                >
                  Ver Dashboard Executivo
                </a>
              </div>

              {recurso && (
                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <h3 className="text-xl font-semibold text-white">
                      {recurso.titulo}
                    </h3>
                  </div>

                  <div className="mb-4 grid gap-3 text-sm md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
                      <p className="text-slate-500">Data</p>
                      <p className="mt-1 font-semibold text-white">
                        {recurso.data_emissao}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
                      <p className="text-slate-500">Valor</p>
                      <p className="mt-1 font-semibold text-white">
                        {recurso.valor_glosado_formatado}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
                      <p className="text-slate-500">Recuperação</p>
                      <p className="mt-1 font-semibold text-white">
                        {recurso.chance_recuperacao}
                      </p>
                    </div>
                  </div>

                  <div className="max-h-[520px] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 p-5">
                    <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                      {recurso.documento}
                    </pre>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <button
                      type="button"
                      onClick={copiarDocumento}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-500"
                    >
                      <ClipboardCopy className="h-5 w-5" />
                      {documentoCopiado
                        ? "Documento Copiado"
                        : "Copiar Documento"}
                    </button>

                    <button
                      type="button"
                      onClick={exportarPdf}
                      disabled={exportandoPdf}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#005CA9] px-6 py-4 font-semibold text-white transition hover:bg-[#1E73BE] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {exportandoPdf ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Exportando...
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5" />
                          Exportar PDF
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
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
  icon: ReactNode;
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