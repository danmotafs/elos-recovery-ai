import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  FileText,
  ScanLine,
  ShieldCheck,
  Stethoscope,
  Wallet,
} from "lucide-react";

const fluxo = [
  {
    number: "01",
    icon: FileText,
    title: "Upload do Documento",
    description:
      "Guias, autorizações, prontuários, contas hospitalares e documentos de apoio são anexados para iniciar a análise.",
  },
  {
    number: "02",
    icon: ScanLine,
    title: "OCR Documental",
    description:
      "A plataforma simula a leitura inteligente do PDF e estrutura os principais dados do caso para análise.",
  },
  {
    number: "03",
    icon: Brain,
    title: "Análise Inteligente",
    description:
      "O motor de regras classifica a glosa, identifica evidências, estima chance de recuperação e sugere recomendação técnica.",
  },
  {
    number: "04",
    icon: Stethoscope,
    title: "Curadoria Especializada ELOS",
    description:
      "A análise é apoiada pela metodologia de especialistas com mais de 40 anos de experiência acumulada.",
  },
  {
    number: "05",
    icon: ClipboardCheck,
    title: "Recurso Administrativo",
    description:
      "O sistema gera um recurso estruturado com fundamentação técnica, justificativa assistencial e pedido de reconsideração.",
  },
  {
    number: "06",
    icon: Wallet,
    title: "Recuperação Financeira",
    description:
      "O dashboard consolida valores glosados, potencial recuperável, prioridades e oportunidades de atuação.",
  },
];

const diferenciais = [
  "Base de conhecimento especializada em glosas hospitalares",
  "Explicabilidade da análise com fonte, evidência e recomendação",
  "Geração automática de recurso administrativo",
  "Exportação de PDF corporativo com identidade ELOS",
  "Dashboard financeiro executivo",
  "Radar do Especialista com curadoria humana especializada",
];

export default function ComoFuncionaPage() {
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
              <ShieldCheck className="h-4 w-4" />
              Tecnologia + curadoria humana especializada
            </div>

            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Como funciona a solução ELOS.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Uma jornada integrada para transformar documentos hospitalares,
              glosas e informações financeiras em análise técnica, recurso
              administrativo e inteligência executiva para recuperação de
              receitas.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/analisar-glosa"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#005CA9] px-7 py-4 font-semibold text-white transition hover:bg-[#1E73BE]"
              >
                Realizar análise
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Ver Dashboard Executivo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
            Fluxo operacional
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Do documento hospitalar ao recurso técnico.
          </h2>
          <p className="mt-5 leading-8 text-slate-300">
            A plataforma organiza o processo de análise de glosas em etapas
            claras, auditáveis e orientadas por dados.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {fluxo.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-300/10">
                    <Icon className="h-7 w-7 text-blue-300" />
                  </div>

                  <span className="text-4xl font-semibold text-white/10">
                    {item.number}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
              Diferenciais
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Uma solução criada para gerar valor operacional.
            </h2>
            <p className="mt-6 leading-8 text-slate-300">
              A proposta não é substituir a equipe técnica, mas acelerar a
              triagem, padronizar a análise e fortalecer a atuação dos
              especialistas da ELOS.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {diferenciais.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-3xl border border-white/10 bg-slate-950 p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-300" />
                <p className="text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                <Stethoscope className="h-4 w-4" />
                Curadoria Técnica ELOS
              </div>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                A tecnologia acelera o processo. A decisão continua apoiada por
                especialistas.
              </h2>

              <p className="mt-6 leading-8 text-slate-300">
                A ELOS combina automação, inteligência financeira e curadoria
                humana para apoiar hospitais e clínicas na recuperação de
                receitas glosadas.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
                Experiência acumulada
              </p>

              <p className="mt-4 text-5xl font-semibold">+40 anos</p>

              <p className="mt-4 leading-8 text-slate-300">
                Experiência acumulada em auditoria hospitalar, faturamento,
                recuperação de receitas e gestão financeira hospitalar.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Auditoria Hospitalar",
                  "Faturamento Hospitalar",
                  "Recuperação de Receitas",
                  "Gestão Financeira Hospitalar",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="font-semibold text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
                Demonstração
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Veja a jornada funcionando na prática.
              </h2>
              <p className="mt-6 leading-8 text-slate-300">
                Anexe um documento, simule a extração dos dados, analise a glosa,
                gere o recurso administrativo e exporte o PDF corporativo.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="/analisar-glosa"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#005CA9] px-7 py-4 font-semibold text-white transition hover:bg-[#1E73BE]"
              >
                Iniciar análise
                <FileSearch className="h-5 w-5" />
              </a>

              <a
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Ver painel executivo
                <BarChart3 className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}