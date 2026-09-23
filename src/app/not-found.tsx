export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-4xl">Sayfa bulunamadı</h1>
      <p className="mt-2 text-muted">Страница не найдена</p>
      <a className="btn-primary mt-6" href="/tr">
        Mami Bakimevi
      </a>
    </div>
  );
}
