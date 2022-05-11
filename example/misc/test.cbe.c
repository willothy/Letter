/* Provide Declarations */
#include <stdint.h>
#ifndef __cplusplus
typedef unsigned char bool;
#endif

/* get a declaration for alloca */
#if defined(__CYGWIN__) || defined(__MINGW32__)
#define  alloca(x) __builtin_alloca((x))
#define _alloca(x) __builtin_alloca((x))
#elif defined(__APPLE__)
extern void *__builtin_alloca(unsigned long);
#define alloca(x) __builtin_alloca(x)
#define longjmp _longjmp
#define setjmp _setjmp
#elif defined(__sun__)
#if defined(__sparcv9)
extern void *__builtin_alloca(unsigned long);
#else
extern void *__builtin_alloca(unsigned int);
#endif
#define alloca(x) __builtin_alloca(x)
#elif defined(__FreeBSD__) || defined(__NetBSD__) || defined(__OpenBSD__) || defined(__DragonFly__) || defined(__arm__)
#define alloca(x) __builtin_alloca(x)
#elif defined(_MSC_VER)
#define alloca(x) _alloca(x)
#else
#include <alloca.h>
#endif

#ifndef _MSC_VER
#define __forceinline __attribute__((always_inline)) inline
#endif



/* Global Declarations */

/* Types Declarations */
struct l_array_5_uint8_t;

/* Function definitions */
typedef uint32_t l_fptr_1(uint8_t*, ...);

typedef uint32_t l_fptr_8(uint32_t);

typedef uint32_t l_fptr_9(void);

typedef void l_fptr_5(uint8_t*);

typedef void l_fptr_3(double);

typedef float l_fptr_7(float);

typedef void l_fptr_2(uint32_t);

typedef double l_fptr_4(float);

typedef double l_fptr_6(double);


/* Types Definitions */
struct l_array_5_uint8_t {
  uint8_t array[5];
};

/* External Global Variable Declarations */

/* Function Declarations */
uint32_t printf(uint8_t*, ...);
void printInt(uint32_t);
void printDouble(double);
double printFloat(float);
void print(uint8_t*);
double circumference(double);
double circumference_OC_1(float);
float circumference_OC_2(float);
uint32_t factorial(uint32_t);
int main(void);


/* Global Variable Definitions and Initialization */
static struct l_array_5_uint8_t anon_str = { "%d\n\x00" };
static struct l_array_5_uint8_t anon_str_OC_1 = { "%f\n\x00" };


/* LLVM Intrinsic Builtin Function Bodies */
static __forceinline uint32_t llvm_sub_u32(uint32_t a, uint32_t b) {
  uint32_t r = a - b;
  return r;
}
static __forceinline uint32_t llvm_mul_u32(uint32_t a, uint32_t b) {
  uint32_t r = a * b;
  return r;
}
static __forceinline float llvm_fmul_f32(float a, float b) {
  float r = a * b;
  return r;
}


/* Function Bodies */

void printInt(uint32_t llvm_cbe_v) {
  uint32_t llvm_cbe_printf_call;

  llvm_cbe_printf_call = printf(((&anon_str.array[((int32_t)0)])), llvm_cbe_v);
}


void printDouble(double llvm_cbe_v) {
  uint32_t llvm_cbe_printf_call;

  llvm_cbe_printf_call = printf(((&anon_str_OC_1.array[((int32_t)0)])), llvm_cbe_v);
}


double printFloat(float llvm_cbe_f) {
  double* llvm_cbe_val;
  double llvm_cbe_id_load_tmp;

  llvm_cbe_val = (double*) alloca(sizeof(double) * (0));
  *llvm_cbe_val = (((double)llvm_cbe_f));
  llvm_cbe_id_load_tmp = *llvm_cbe_val;
  return llvm_cbe_id_load_tmp;
}


void print(uint8_t* llvm_cbe_str) {
  uint32_t llvm_cbe_printf_call;

  llvm_cbe_printf_call = printf(llvm_cbe_str);
}


double circumference(double llvm_cbe_radius) {
  return (6.2831852000000001 * llvm_cbe_radius);
}


double circumference_OC_1(float llvm_cbe_radius) {
  return (6.2831852000000001 * (((double)llvm_cbe_radius)));
}


float circumference_OC_2(float llvm_cbe_radius) {
  return (llvm_fmul_f32(6.283185, llvm_cbe_radius));
}


uint32_t factorial(uint32_t llvm_cbe_n) {
  uint32_t llvm_cbe_factorial_call;

  if ((llvm_cbe_n == 0u)) {
    goto llvm_cbe_iftrue;
  } else {
    goto llvm_cbe_else;
  }

llvm_cbe_iftrue:
  return 1;
llvm_cbe_else:
  goto llvm_cbe_if_conv;

llvm_cbe_if_conv:
  llvm_cbe_factorial_call = factorial((llvm_sub_u32(llvm_cbe_n, 1)));
  return (llvm_mul_u32(llvm_cbe_n, llvm_cbe_factorial_call));
}


int main(void) {
  uint32_t llvm_cbe_factorial_call;

  llvm_cbe_factorial_call = factorial(10);
  printInt(llvm_cbe_factorial_call);
  return 0;
}

