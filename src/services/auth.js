// FAKE AUTH SERVICE

export function Signin() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'ae5rj4a6t4j6dty4j36s84rts',
      });
    }, 1000);
  });
}
