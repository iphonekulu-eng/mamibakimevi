import { PageBanner } from "@/components/PageBanner";
import { localeFromParam } from "@/lib/i18n";

export default async function TermsPage({
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
        alt="Kullanım şartları"
        title={isRu ? "Условия использования" : "Kullanım Şartları"}
      />
      <div className="prose mt-10 max-w-none space-y-6 text-muted">
        {isRu ? (
          <>
            <p>Последнее обновление: {new Date().getFullYear()} г.</p>
            <h2 className="font-serif text-2xl text-ink">1. Назначение платформы</h2>
            <p>Mami Bakimevi — информационная платформа, которая соединяет семьи, нуждающиеся в уходе, с потенциальными сиделками. Платформа не является агентством по трудоустройству и не несёт ответственности за действия сторон после знакомства.</p>
            <h2 className="font-serif text-2xl text-ink">2. Одобрение профилей</h2>
            <p>Одобрение профиля администратором означает лишь то, что заявка была проверена платформой. Это не является государственной, медицинской или профессиональной сертификацией.</p>
            <h2 className="font-serif text-2xl text-ink">3. Ответственность пользователей</h2>
            <p>Пользователи обязаны предоставлять достоверную информацию. Mami Bakimevi оставляет за собой право удалить любой профиль или заблокировать доступ при нарушении правил.</p>
            <h2 className="font-serif text-2xl text-ink">4. Ограничение ответственности</h2>
            <p>Платформа не несёт ответственности за последствия, возникшие в результате взаимодействия между сторонами. Пользователи действуют на свой страх и риск.</p>
            <h2 className="font-serif text-2xl text-ink">5. Изменения условий</h2>
            <p>Условия могут быть изменены в любое время. Продолжение использования платформы означает согласие с актуальной редакцией условий.</p>
          </>
        ) : (
          <>
            <p>Son güncelleme: {new Date().getFullYear()}</p>
            <h2 className="font-serif text-2xl text-ink">1. Platformun Amacı</h2>
            <p>Mami Bakimevi; bakıma ihtiyaç duyan kişilerin yakınları ile potansiyel bakıcıları buluşturan bir bilgi platformudur. Platform bir istihdam bürosu değildir; tarafların tanışması sonrasındaki ilişkilerden sorumlu tutulamaz.</p>
            <h2 className="font-serif text-2xl text-ink">2. Profil Onayı</h2>
            <p>Admin onayı, başvurunun platform tarafından incelendiğini ifade eder. Bu onay; kişinin devlet, sağlık kurumu veya mesleki bir kuruluş tarafından sertifikalandırıldığı anlamına gelmez.</p>
            <h2 className="font-serif text-2xl text-ink">3. Kullanıcı Sorumlulukları</h2>
            <p>Kullanıcılar doğru ve eksiksiz bilgi vermekle yükümlüdür. Mami Bakimevi, kurallara aykırı profilleri kaldırma veya erişimi engelleme hakkını saklı tutar.</p>
            <h2 className="font-serif text-2xl text-ink">4. Sorumluluk Sınırlaması</h2>
            <p>Platform, taraflar arasındaki etkileşimden kaynaklanabilecek sonuçlardan sorumlu değildir. Kullanıcılar kendi inisiyatifleriyle hareket eder.</p>
            <h2 className="font-serif text-2xl text-ink">5. Değişiklikler</h2>
            <p>Şartlar önceden bildirim yapılmaksızın değiştirilebilir. Platformu kullanmaya devam etmek, güncel şartları kabul etmek anlamına gelir.</p>
          </>
        )}
      </div>
    </div>
  );
}
