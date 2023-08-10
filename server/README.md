# BE   

## setting   
server 폴더 생성   
mkdir server   
npm init -y   
package.json => main:index.js => index.ts   

npm i express   
npm i -D morgan nodemon typescript ts-node @types/node @types/express @types/morgan   
npx tsc --init

### nodemon   
서버에서 코드 변경하면 서버를 재시작해야 반영되는데 노드몬을 사용해 자동으로 서버를 재시작해 줌   
### ts-node
노드JS에서 타입스크립트 컴파일러 없이, 직접 타입 스크립트를 실행시켜 줌      
### morgan   
로그 관리를 위해 사용함   
### @types/*
타입 정의를 용이하게 만들어 줌
### tsconfig.json
타입스크립트로 작성된 코드를 자바스크립트로 컴파일하는 옵션을 설정하는 파일   

## DB <=> BE 연결
npm i pg typeorm reflect-meatadata
npx typeorm init (명령어를 사용하면 tsconfig.json의 내용이 변경되어 오류가 표시될 수도 있음)   
### pg   
Postgres의 노드JS 모듈   
### typeorm   
타입스크립트 등에서 사용할 수 있는 노드JS ORM(객체 관계형 매퍼 라이브러리)   
ORM?   
객체와 관계형 DB의 데이터를 자동으로 변형 및 연결   
ORM을 이용하면 객체와 DB의 변형의 유연하게 가능함   
객체 지향 프로그래밍은 클래스를 사용하고 관계형 DB는 테이블을 사용해 불일치가 존재해 typeorm으로 매핑할 수 있다.
#### TypeORM의 특징과 장점
모델을 기반으로 DB 테이블 체계를 자동으로 생성   
DB에서 개체를 쉽게 삽입, 삭제, 수정을 쉽게할 수 있음   
테이블 간의 매핑(일대일, 일대다, 다대다)을 만들어 줌   
간단한 CLI 명령을 제공
https://typeorm.io/#installation
### reflect-meatadata
Typeorm 데코레이터를 분석

## 엔티티 생성
npm i bcryptjs class-validator class-transformer uuid
npm i -D @types/bcryptjs

### bcryptjs
비밀번호를 암호화해 줌   
### class-validator
데코레이터를 이용해 요청에서 오는 오브젝트의 프로퍼티를 검증   
### class-transformer
일반 개체를 클래스의 인스턴스 또는 그 반대로 사용할 수 있음   
자바스크립트의 오브젝트는 플레인(리터럴)오브젝트, 클래스 오브젝트 2가지가 존재
#### class-transformer의 장점
응집력 있는 코드를 작성할 수 있음
### uuid