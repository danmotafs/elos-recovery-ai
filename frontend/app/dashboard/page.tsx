import {
  ArrowLeft,
  BarChart3,
  Building2,
  ClipboardList,
  FileWarning,
  LineChart,
  PieChart,
  TrendingUp,
  Wallet,
} from "lucide-react";

const kpis = [
  {
    label: "Casos analisados",
    value: "1.248",
    detail: "volume total monitorado",
    icon: ClipboardList,
  },
  {
    label: "Valor total glosado",
    value: "R$ 4,8M",
    detail: "em contas auditadas",
    icon: Wallet,
  },
  {
    label: "Potencial recuperável",
    value: "R$ 3,1M",
    detail: "estimativa por classificação",
    icon: TrendingUp,
  },
  {
    label: "Taxa média de recuperação",
    value: "64%",
    detail: "média estimada",
    icon: BarChart3,
  },
];

const categorias = [
  { nome: "Documentação", valor: "38%", largura: "38%" },
  { nome: "CID/TUSS", valor: "24%", largura: "24%" },
  { nome: "Autorização", valor: "18%", largura: "18%" },
  { nome: "Material/Medicamento", valor: "14%", largura: "14%" },
  { nome: "Prazo ou Envio", valor: "6%", largura: "6%" },
];

const convenios = [
  { nome: "Unimed", valor: "R$ 1,42M", casos: "342 casos" },
  { nome: "Bradesco Saúde", valor: "R$ 980 mil", casos: "251 casos" },
  { nome: "SulAmérica", valor: "R$ 740 mil", casos: "188 casos" },
  { nome: "Amil", valor: "R$ 520 mil", casos: "132 casos" },
];

const hospitais = [
  { nome: "Hospital Santa Clara", valor: "R$ 1,18M", risco: "Alto" },
  { nome: "Hospital Vida", valor: "R$ 870 mil", risco: "Médio" },
  { nome: "Clínica São Lucas", valor: "R$ 410 mil", risco: "Baixo" },
  { nome: "Hospital Esperança", valor: "R$ 940 mil", risco: "Alto" },
];

const casosRecentes = [
  {
    hospital: "Santa Casa",
    convenio: "Bradesco Saúde",
    categoria: "Documentação",
    valor: "R$ 4.500",
    chance: "82%",
  },
  {
    hospital: "Hospital Vida",
    convenio: "Unimed",
    categoria: "CID/TUSS",
    valor: "R$ 8.200",
    chance: "74%",
  },
  {
    hospital: "Clínica São Lucas",
    convenio: "SulAmérica",
    categoria: "Autorização",
    valor: "R$ 3.750",
    chance: "68%",
  },
  {
    hospital: "Hospital Esperança",
    convenio: "Amil",
    categoria: "Material/Medicamento",
    valor: "R$ 11.900",
    chance: "70%",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,92,169,0.30),transparent_35%),radial-gradient(circle_at_top_left,rgba(155,155,155,0.16),transparent_30%)]" />

        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
          <a
            href="/analisar-glosa"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Nova análise
          </a>

          <img
            src="/brand/banner-elos.png"
            alt="Elos Consultoria e Gestão Financeira Hospitalar"
            className="hidden h-auto w-[360px] object-contain md:block"
          />
        </header>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-8">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/10 px-4 py-2 text-sm text-blue-200">
              <LineChart className="h-4 w-4" />
              Painel executivo de glosas e recuperação de receitas
            </div>

            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Dashboard Executivo.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Visão consolidada de perdas financeiras, potencial de recuperação,
              categorias de glosa, convênios, hospitais e casos recentes para
              suporte à tomada de decisão.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-[2rem] border border-blue-300/20 bg-blue-300/10 p-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
              Trilha da demonstração
            </p>
            <p className="mt-3 text-lg text-slate-200">
  Página Inicial → Conheça a Solução → Resultado da Análise →
  Dashboard Executivo
</p>
          </div>

          <a
            href="/analisar-glosa"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-100"
          >
            Realizar nova análise
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;

            return (
              <div
                key={kpi.label}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-300/10">
                  <Icon className="h-6 w-6 text-blue-300" />
                </div>

                <p className="text-sm text-slate-400">{kpi.label}</p>
                <p className="mt-2 text-3xl font-semibold">{kpi.value}</p>
                <p className="mt-2 text-sm text-slate-500">{kpi.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-300/10">
                <PieChart className="h-6 w-6 text-blue-300" />
              </div>

              <div>
                <h2 className="text-2xl font-semibold">
                  Glosas por categoria
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Distribuição dos principais motivos identificados.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {categorias.map((categoria) => (
                <div key={categoria.nome}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-300">{categoria.nome}</span>
                    <span className="font-medium text-blue-200">
                      {categoria.valor}
                    </span>
                  </div>

                  <div className="h-3 rounded-full bg-white/10">
                    <div
                      className="h-3 rounded-full bg-[#005CA9]"
                      style={{ width: categoria.largura }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-300/10">
                <FileWarning className="h-6 w-6 text-blue-300" />
              </div>

              <div>
                <h2 className="text-2xl font-semibold">Casos recentes</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Últimas análises classificadas pelo motor de conhecimento.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {casosRecentes.map((caso) => (
                <div
                  key={`${caso.hospital}-${caso.valor}`}
                  className="rounded-3xl border border-white/10 bg-slate-950 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">{caso.hospital}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {caso.convenio} • {caso.categoria}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-white">{caso.valor}</p>
                      <p className="mt-1 text-sm text-blue-200">
                        {caso.chance} recuperável
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <RankingCard
            icon={<Building2 className="h-6 w-6 text-blue-300" />}
            title="Top convênios por valor glosado"
            description="Convênios com maior impacto financeiro acumulado."
            items={convenios.map((convenio) => ({
              primary: convenio.nome,
              secondary: convenio.casos,
              value: convenio.valor,
            }))}
          />

          <RankingCard
            icon={<BarChart3 className="h-6 w-6 text-blue-300" />}
            title="Top hospitais por exposição financeira"
            description="Unidades com maior volume de valores em análise."
            items={hospitais.map((hospital) => ({
              primary: hospital.nome,
              secondary: `Risco operacional: ${hospital.risco}`,
              value: hospital.valor,
            }))}
          />
        </div>
      </section>
    </main>
  );
}

function RankingCard({
  icon,
  title,
  description,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: {
    primary: string;
    secondary: string;
    value: string;
  }[];
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-300/10">
          {icon}
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.primary}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-3xl border border-white/10 bg-slate-950 p-5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-300/10 text-sm font-semibold text-blue-200">
              {index + 1}
            </div>

            <div>
              <p className="font-semibold">{item.primary}</p>
              <p className="mt-1 text-sm text-slate-400">{item.secondary}</p>
            </div>

            <p className="font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}