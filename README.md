# Hastane Randevu Sistemi

Bu proje, kullanıcıların (hastalar, doktorlar ve yöneticiler) hastane randevularını yönetmelerini sağlayan bir sistemdir. Sistem, kullanıcı kayıt ve giriş işlemleri, profil yönetimi, randevu alma ve yönetimi gibi birçok özelliği içermektedir.

## İçindekiler

- [Bilgi](#bilgi)
- [Proje Tanımı](#proje-tanımı)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Prensipler ve Yaklaşımlar](#prensipler-ve-yaklaşımlar)
- [Başlangıç](#başlangıç)
  - [Gereksinimler](#gereksinimler)
  - [Kurulum](#kurulum)
    - [Frontend için](#frontend-için)
    - [Backend için](#backend-için)
  - [Çalıştırma](#çalıştırma)
    - [Frontend Başlatma](#frontend-başlatma)
    - [Backend Başlatma](#backend-başlatma)
- [Kullanım](#kullanım)
  - [Kullanıcı Kayıt ve Giriş Sistemi](#kullanıcı-kayıt-ve-giriş-sistemi)
  - [Profil Yönetimi](#profil-yönetimi)
  - [Randevu Sistemi](#randevu-sistemi)
  - [Randevu Yönetimi](#randevu-yönetimi)
  - [Doktor Takvimi](#doktor-takvimi)
  - [Hasta Raporları ve Geçmiş Randevular](#hasta-raporları-ve-geçmiş-randevular)
  - [Bildirim Sistemi](#bildirim-sistemi)
  - [Admin Paneli](#admin-paneli)
  - [Raporlama ve Analiz](#raporlama-ve-analiz)
  - [Güvenlik](#güvenlik)
  - [Yetkilendirme ve Rol Yönetimi](#yetkilendirme-ve-rol-yönetimi)
  - [Destek ve Yardım Bölümü](#destek-ve-yardım-bölümü)
  - [Kullanıcı Geri Bildirimi](#kullanıcı-geri-bildirimi)
- [Geliştirme Aşamasında Neler Var?](#geliştirme-aşamasında-neler-var)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Screenshots](#screenshots)
- [Lisans](#lisans)

## Bilgi

### Angular CLI Bilgileri

Bu proje, Angular CLI kullanılarak oluşturulmuştur. Angular CLI kullanımı ile ilgili bazı temel bilgileri aşağıda bulabilirsiniz.

#### Development server

Geliştirme sunucusunu çalıştırmak için `ng serve` komutunu kullanın. `http://localhost:4200/` adresine gidin. Uygulama, kaynak dosyalarında yaptığınız değişikliklerle otomatik olarak yeniden yüklenecektir.

#### Code scaffolding

Yeni bir bileşen oluşturmak için `ng generate component component-name` komutunu kullanın. Ayrıca `ng generate directive|pipe|service|class|guard|interface|enum|module` komutlarını da kullanabilirsiniz.

#### Build

Projeyi derlemek için `ng build` komutunu kullanın. Derleme çıktıları `dist/` dizininde saklanacaktır.

#### Running unit tests

Birim testlerini çalıştırmak için `ng test` komutunu kullanın. Bu testler [Karma](https://karma-runner.github.io) üzerinden yürütülecektir.

#### Running end-to-end tests

Uçtan uca testleri çalıştırmak için `ng e2e` komutunu kullanın. Bu komutu kullanmak için, önce uçtan uca test yeteneklerini sağlayan bir paketi eklemeniz gerekmektedir.

#### Further help

Angular CLI hakkında daha fazla yardım almak için `ng help` komutunu kullanın veya [Angular CLI Genel Bakış ve Komut Referansı](https://angular.io/cli) sayfasına göz atın.

## Proje Tanımı

Hastane Randevu Sistemi, hastaların, doktorların ve yöneticilerin randevu işlemlerini kolaylaştırmak amacıyla geliştirilmiştir. Kullanıcılar sisteme kayıt olup giriş yapabilir, profillerini yönetebilir, doktorların uygunluk durumuna göre randevu alabilir ve yönetebilirler. Doktorlar kendi çalışma takvimlerini belirleyebilir ve randevularını yönetebilir. Yöneticiler ise sistemdeki tüm kullanıcıları ve randevuları yönetebilir, sistemin kullanım istatistiklerini görüntüleyebilir.

## Kullanılan Teknolojiler

### Backend
- ASP.NET Core 8
- C#
- Fluent Validation
- Entity Framework Core
- AutoMapper
- Newtonsoft.Json
- Mediatr
- Json Web Token
- Web API
- Swagger
- MsSQL
- MailKit - MimeKit

### Frontend
- Angular 17
- Typescript
- Bootstrap
- SweetAlert
- Toastr
- ngx-spinner
- RxJS
- auth0/angular-jwt
- FullCalendar
- ChartJS
- jQuery

### Prensipler ve Yaklaşımlar
- Clean Architecture
- Code First
- CQRS
- OOP
- SOLID
- AOP
- IoC
- Fluent API

## Başlangıç

### Gereksinimler

Projenizi yerel ortamda çalıştırmak için aşağıdaki yazılımlara ihtiyacınız olacak:
- Node.js
- .NET SDK
- Visual Studio veya Visual Studio Code (Backend için)

### Kurulum

#### Frontend için
1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/arifiskilip/appointment-system-frontend.git

2. Proje Dizini İçine Girin:
   ```bash
   cd AppointmentSystemFrontend

3. Bağımlılıkları yükleyin:
   ```bash
   npm install

4. Geliştirme Sunucusunu Başlatın:
   ```bash
   ng serve

5. Tarayıcıda Açın: Tarayıcınızda 'http://localhost:4200/' adresine gidin.

#### Backend için
1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/arifiskilip/Pair6_AppointmentSystem.git

2. Visual Studio'yu açın ve 'Open Project/Solution' ile projeyi açın.
3. Database Migration için 'Persistence' katmanındaki 'AppointmentSystemContext.cs' dosyasını açın.
4. Web API Swagger ekranından herhangi bir katman için 'getList' yaparak database oluşturun.
5. 'Set as Startup Project' seçeneği ile 'WebAPI' klasörünü başlatın.

### Çalıştırma

#### Frontend'i Başlatma
1. Terminali açın ve proje klasörüne gidin:
   ```bash
   cd path/to/AppointmentSystemFrontend

2. Bağımlılıkları yükleyin:
   ```bash
   npm install

3. Frontend'i başlatmak için:
   ```bash
   npm start

4. Daha sonra:
   ```bash
   ng serve

#### Backend'i Başlatma
1. Visual Studio'yu açın ve projeyi başlatın.
3. Database Migration için 'Persistence' katmanındaki 'AppointmentSystemContext.cs' dosyasını açın. 'Database.EnsureCreated()' satırını yorumdan kaldırın.
4. Web API Swagger ekranından herhangi bir katman için 'getList' yaparak database oluşturun.
5. 'Set as Startup Project' seçeneği ile 'WebAPI' klasörünü başlatın.

## Kullanım

### Kullanıcı Kayıt ve Giriş Sistemi

Kullanıcılar (hastalar, doktorlar ve yöneticiler) sisteme kayıt olabilir ve giriş yapabilir. Kullanıcı kayıt sırasında ad, soyad, e-posta, telefon numarası ve şifre bilgileri girilir. Giriş için kullanıcı adı (e-posta) ve şifre kullanılır.

### Profil Yönetimi

Kullanıcılar kendi profil bilgilerini görüntüleyebilir ve günceller.. Kullanıcılar kişisel bilgilerini (adres, telefon numarası vb.) günceller. Şifre değiştirme özelliği vardır.

### Randevu Sistemi

Hastalar, doktorların uygunluk durumuna göre randevu alabilir. Randevu tarih ve saat seçimi yapabilir. Randevu alındıktan sonra, kullanıcılara e-posta ile bilgilendirme yapılır.

### Randevu Yönetimi

Hastalar randevu alabilir ve mevcut randevularını görüntüleyebilir. Hastalar randevularını iptal edebilir. Doktorlar kendi randevu takvimlerini görüntüleyebilir. Yöneticiler sistemdeki tüm randevuları görüntüleyebilir ve yönetebilir.

### Doktor Takvimi

Doktorlar kendi çalışma takvimlerini belirleyebilir. Doktorlar mevcut randevuları ve boş saat dilimlerini görebilir.

### Hasta Raporları ve Geçmiş Randevular

Hastalar, geçmiş randevularını ve doktor raporlarını görüntüleyebilir. Doktorlar, hastaların geçmiş randevu bilgilerine ve raporlarına erişebilir.

### Bildirim Sistemi

Hastalara ve doktorlara yaklaşan randevuları hakkında bildirim gönderilir. Bildirimler e-posta yoluyla yapılır.

### Admin Paneli

Yöneticiler, sistemdeki tüm kullanıcıları ve randevuları yönetebilir. Yöneticiler kullanıcıların bilgilerini düzenleyebilir.

### Raporlama ve Analiz

Yöneticiler, sistemin kullanım istatistiklerini ve raporlarını görüntüleyebilir. Randevu sayısı, kullanıcı sayısı gibi metrikler raporlanabilir.

### Güvenlik

Kullanıcı bilgileri ve iletişim bilgileri şifrelenmiş bir şekilde saklanır. (Encryption)

### Yetkilendirme ve Rol Yönetimi

Sistem farklı kullanıcı rolleri (hasta, doktor, yönetici) için yetkilendirme mekanizması içerir. Her rolün erişim hakları tanımlıdır.

### Destek ve Yardım Bölümü

Kullanıcılar sistemle ilgili yardım ve destek alabilecekleri bir bölüm bulunur. Sıkça Sorulan Sorular (SSS) bölümü.

### Kullanıcı Geri Bildirimi

Kullanıcılar sistemle ilgili geri bildirim ve önerilerde bulunabilir. Geri bildirimler yöneticiler tarafından görüntülenir.

## Geliştirme Aşamasında Neler Var?

- Yeni özellikler ve iyileştirmeler
- Daha kapsamlı dokümantasyon
- Daha fazla güvenlik önlemi eklenmesi
- Mobil uygulama geliştirilmesi
- Daha detaylı raporlama ve analiz araçları vb.

## Katkıda Bulunma

Katkıda bulunmak istiyorsanız, lütfen bir pull request açmadan önce bir issue açarak neyi değiştirmek veya eklemek istediğinizi tartışın. Her türlü geri bildiriminiz için teşekkür ederiz! Projeye katkıda bulunmak isterseniz aşağıdaki adımları izleyebilirsiniz:

1. Bu projeyi forklayın.
2. Forkladığınız projeyi klonlayın:
   ```bash
   git clone https://github.com/kullanıcı-adı/hastane-randevu-sistemi.git

3. Yeni bir dal (branch) oluşturun:
   ```bash
   git checkout -b özellik-isim

4. Yaptığınız değişiklikleri commitleyin:
   ```bash
   git commit -m 'Yeni özellik ekleme'

5. Değişiklikleri dalınıza push edin:
   ```bash
   git push origin özellik-isim

6. Bir pull request açın.

## Screenshots





## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Daha fazla bilgi için LICENSE dosyasına bakın.
