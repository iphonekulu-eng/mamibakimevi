import { PageBanner } from "@/components/PageBanner";
import { localeFromParam } from "@/lib/i18n";

export default async function KvkkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = localeFromParam((await params).locale);
  const isRu = locale === "ru";

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <PageBanner
        src="/images/about-home.jpg"
        alt="Gizlilik politikası"
        title={isRu ? "Политика конфиденциальности" : "Gizlilik Politikası (KVKK)"}
      />
      <div className="prose mt-10 max-w-none space-y-6 text-muted">
        {isRu ? (
          <>
            <p>Последнее обновление: {new Date().getFullYear()} г.</p>
            <h2 className="font-serif text-2xl text-ink">1. Сбор персональных данных</h2>
            <p>Mami Bakimevi собирает имя, фамилию, номер телефона, адрес электронной почты, город и район проживания, а также документы, загружаемые при подаче заявки сиделки. Данные собираются исключительно для целей подбора персонала по уходу.</p>
            <h2 className="font-serif text-2xl text-ink">2. Использование данных</h2>
            <p>Персональные данные используются для рассмотрения заявок, публикации одобренных профилей и организации связи между сторонами через администратора. Данные не передаются третьим лицам без согласия владельца.</p>
            <h2 className="font-serif text-2xl text-ink">3. Хранение данных</h2>
            <p>Данные хранятся на защищённых серверах. Контактная информация сиделок не отображается публично — она доступна только администратору платформы.</p>
            <h2 className="font-serif text-2xl text-ink">4. Права пользователя</h2>
            <p>Вы вправе запросить доступ, исправление или удаление своих данных. Для этого свяжитесь с нами через WhatsApp: +90 555 687 4803.</p>
            <h2 className="font-serif text-2xl text-ink">5. Файлы cookie</h2>
            <p>Сайт использует только необходимые файлы cookie для обеспечения работы сессии администратора. Маркетинговые cookie не применяются.</p>
          </>
        ) : (
          <>
            <p>Son güncelleme: {new Date().getFullYear()}</p>
            <h2 className="font-serif text-2xl text-ink">1. Kişisel Verilerin Toplanması</h2>
            <p>Mami Bakimevi; ad, soyad, telefon numarası, e-posta adresi, şehir ve ilçe bilgisi ile bakıcı başvurusunda yüklenen belgeleri toplar. Veriler yalnızca bakıcı eşleştirme hizmeti amacıyla işlenir.</p>
            <h2 className="font-serif text-2xl text-ink">2. Verilerin Kullanımı</h2>
            <p>Kişisel veriler; başvuruların incelenmesi, onaylanan profillerin yayınlanması ve tarafların admin üzerinden iletişime geçirilmesi amacıyla kullanılır. Veriler, veri sahibinin açık rızası olmaksızın üçüncü taraflarla paylaşılmaz.</p>
            <h2 className="font-serif text-2xl text-ink">3. Verilerin Saklanması</h2>
            <p>Veriler güvenli sunucularda saklanır. Bakıcıların iletişim bilgileri kamuya açık değildir; yalnızca platform yöneticisi tarafından görüntülenebilir.</p>
            <h2 className="font-serif text-2xl text-ink">4. Veri Sahibinin Hakları</h2>
            <p>6698 sayılı KVKK kapsamında verilerinize erişim, düzeltme veya silinmesini talep edebilirsiniz. Bunun için WhatsApp üzerinden iletişime geçin: +90 555 687 4803.</p>
            <h2 className="font-serif text-2xl text-ink">5. Çerezler</h2>
            <p>Site yalnızca admin oturumu için zorunlu çerezler kullanır. Pazarlama veya takip amaçlı çerez kullanılmaz.</p>
          </>
        )}
      </div>
    </div>
  );
}
