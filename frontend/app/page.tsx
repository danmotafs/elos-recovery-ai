import {
  Activity,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  LineChart,
  ShieldCheck,
} from "lucide-react";

const metrics = [
  { label: "Casos analisados", value: "1.248+" },
  { label: "Receita monitorada", value: "R$ 4,8M" },
  { label: "Tempo médio reduzido", value: "62%" },
];

const steps = [
  {
    icon: FileSearch,
    title: "Entrada do caso",
    description:
      "Cadastro estruturado de glosas, procedimentos, convênios, CID, valores e justificativas.",
  },
  {
    icon: Brain,
    title: "Análise inteligente",
    description:
      "Aplicação de regras assistenciais, financeiras e motor de IA para classificação e recomendação.",
  },
  {
    icon: ClipboardCheck,
    title: "Recurso orientado",
    description:
      "Geração de parecer técnico, prioridade operacional e trilha de ação para recuperação de receita.",
  },
];

const benefits = [
  "Padronização da análise de glosas",
  "Redução de perdas financeiras hospitalares",
  "Rastreabilidade técnica e operacional",
  "Indicadores para auditoria, faturamento e gestão",
  "Base para evolução com agentes de IA",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,92,169,0.30),transparent_35%),radial-gradient(circle_at_top_left,rgba(155,155,155,0.16),transparent_30%)]" />

        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-10">
          <div className="flex items-center">
            <img
              src="/brand/banner-elos.png"
              alt="Elos Consultoria e Gestão Financeira Hospitalar"
              className="h-auto w-[520px] object-contain"
            />
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#solucao" className="hover:text-white">
              Soluções
            </a>
            <a href="#fluxo" className="hover:text-white">
              Serviços
            </a>
            <a href="#painel" className="hover:text-white">
              Tecnologia
            </a>
            <a href="#contato" className="hover:text-white">
              Contato
            </a>
          </nav>

          <a
            href="#painel"
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-100 md:inline-flex"
          >
            Ver demonstração
          </a>
        </header>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/10 px-4 py-2 text-sm text-blue-200">
              <ShieldCheck className="h-4 w-4" />
              IA aplicada à auditoria hospitalar e recuperação de receitas
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              Inteligência financeira para Hospitais e Clínicas.
              <br />
              Recuperação de receitas orientada por dados.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Plataforma inteligente para análise de glosas, padronização de
              processos, apoio técnico ao recurso e geração de indicadores para
              assistência, faturamento e auditoria.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#painel"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#005CA9] px-7 py-4 font-semibold text-white transition hover:bg-[#1E73BE]"
              >
                Conhecer plataforma
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="#solucao"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Ver proposta técnica
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
                >
                  <p className="text-3xl font-semibold text-white">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-blue-950/40 backdrop-blur">
            <div className="rounded-[1.5rem] bg-slate-900 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Painel executivo</p>
                  <h2 className="text-2xl font-semibold">
                    Recuperação de Receita
                  </h2>
                </div>
                <div className="rounded-full bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
                  +24,8%
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/[0.06] p-5">
                  <BarChart3 className="mb-5 h-6 w-6 text-blue-300" />
                  <p className="text-sm text-slate-400">Valor em análise</p>
                  <p className="mt-2 text-3xl font-semibold">R$ 842 mil</p>
                </div>

                <div className="rounded-2xl bg-white/[0.06] p-5">
                  <Activity className="mb-5 h-6 w-6 text-slate-300" />
                  <p className="text-sm text-slate-400">Taxa de recurso</p>
                  <p className="mt-2 text-3xl font-semibold">78%</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white/[0.06] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-medium">Glosas por categoria</p>
                  <LineChart className="h-5 w-5 text-slate-400" />
                </div>

                <div className="space-y-4">
                  {[
                    ["Documentação incompleta", "86%"],
                    ["Divergência de procedimento", "64%"],
                    ["Inconsistência CID/TUSS", "52%"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-slate-300">{label}</span>
                        <span className="text-slate-400">{value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-[#005CA9]"
                          style={{ width: value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-blue-300/20 bg-blue-300/10 p-5">
                <p className="text-sm font-semibold text-blue-200">
                  Recomendação IA
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Priorizar recurso técnico com revisão documental, vínculo
                  entre CID informado e procedimento executado, e validação
                  assistencial antes do reenvio ao convênio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solucao" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
              Soluções
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Uma camada de inteligência entre assistência, faturamento e
              auditoria.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-300" />
                <p className="text-slate-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fluxo" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
              Serviços
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Do caso de glosa ao recurso técnico orientado por dados.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="rounded-[2rem] border border-white/10 bg-slate-950 p-8"
                >
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-300/10">
                    <Icon className="h-7 w-7 text-blue-300" />
                  </div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-4 leading-7 text-slate-400">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="painel" className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
                Tecnologia
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                MVP preparado para evoluir para APIs, agentes e fluxos
                assíncronos.
              </h2>
              <p className="mt-6 leading-8 text-slate-300">
                A primeira versão apresenta a proposta comercial e técnica da
                solução. A evolução natural inclui backend em Python, FastAPI,
                banco de dados, logs auditáveis e agente de IA para análise de
                glosas.
              </p>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <p className="font-semibold">Tecnologias planejadas</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
                  {[
                    "Next.js",
                    "TypeScript",
                    "Tailwind",
                    "Python",
                    "FastAPI",
                    "Pydantic",
                    "PostgreSQL",
                    "Agentes de IA",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-4 py-2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-semibold">Casos recentes</p>
                <span className="rounded-full bg-blue-300/10 px-3 py-1 text-xs text-blue-200">
                  Prévia funcional
                </span>
              </div>

              <div className="space-y-3">
                {[
                  ["Hospital Santa Clara", "R$ 18.420", "Alta prioridade"],
                  ["Hospital Vida", "R$ 9.870", "Revisão técnica"],
                  ["Clínica São Lucas", "R$ 4.230", "Baixo risco"],
                  ["Hospital Esperança", "R$ 27.100", "Alta prioridade"],
                ].map(([hospital, value, status]) => (
                  <div
                    key={hospital}
                    className="grid grid-cols-[1fr_auto] gap-4 rounded-2xl bg-slate-950 p-4"
                  >
                    <div>
                      <p className="font-medium">{hospital}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        Valor glosado: {value}
                      </p>
                    </div>
                    <div className="text-right text-sm text-blue-200">
                      {status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] border border-blue-300/20 bg-blue-300/10 p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
            Contato
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Tecnologia, auditoria e inteligência financeira para hospitais.
          </h2>
          <p className="mt-6 max-w-2xl leading-8 text-slate-300">
            A Elos Consultoria e Gestão Financeira Hospitalar atua na
            estruturação de processos, análise de glosas e suporte à recuperação
            de receitas hospitalares com base em dados, padronização e
            inteligência operacional.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-slate-500">
        Elos Consultoria e Gestão Financeira Hospitalar — Inteligência aplicada
        à auditoria hospitalar e recuperação de receitas.
      </footer>
    </main>
  );
}