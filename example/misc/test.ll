; ModuleID = 'test'
source_filename = "test"

@anon_str = private unnamed_addr constant [5 x i8] c"%d\0A\00\00", align 1
@anon_str.1 = private unnamed_addr constant [7 x i8] c"true\0A\00\00", align 1
@anon_str.2 = private unnamed_addr constant [8 x i8] c"false\0A\00\00", align 1
@anon_str.3 = private unnamed_addr constant [5 x i8] c"%f\0A\00\00", align 1
@anon_str.4 = private unnamed_addr constant [5 x i8] c"%f\0A\00\00", align 1

declare i32 @printf(i8*, ...)

define void @printInt(i32 %v) {
entry:
  %printf_call = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str, i32 0, i32 0), i32 %v)
  ret void
}

define void @printBool(i1 %v) {
entry:
  %int_cmp_eq = icmp eq i1 %v, true
  br i1 %int_cmp_eq, label %iftrue, label %else

iftrue:                                           ; preds = %entry
  %printf_call = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([7 x i8], [7 x i8]* @anon_str.1, i32 0, i32 0))
  br label %if_conv

else:                                             ; preds = %entry
  %printf_call1 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([8 x i8], [8 x i8]* @anon_str.2, i32 0, i32 0))
  br label %if_conv

if_conv:                                          ; preds = %else, %iftrue
  ret void
}

define void @printDouble(double %v) {
entry:
  %printf_call = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str.3, i32 0, i32 0), double %v)
  ret void
}

define void @printFloat(float %f) {
entry:
  %val = alloca double, i8 0, align 8
  %flt_upcast = fpext float %f to double
  store double %flt_upcast, double* %val, align 8
  %id_load_tmp = load double, double* %val, align 8
  %printf_call = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str.4, i32 0, i32 0), double %id_load_tmp)
  ret void
}

define void @print(i8* %str) {
entry:
  %printf_call = call i32 (i8*, ...) @printf(i8* %str)
  ret void
}

define double @circumference(double %radius) {
entry:
  %dbl_multmp = fmul double 0x401921FB4D12D84A, %radius
  ret double %dbl_multmp
}

define double @circumference.1(float %radius) {
entry:
  %flt_upcast = fpext float %radius to double
  %dbl_multmp = fmul double 0x401921FB4D12D84A, %flt_upcast
  ret double %dbl_multmp
}

define float @circumference.2(float %radius) {
entry:
  %flt_multmp = fmul float 0x401921FB40000000, %radius
  ret float %flt_multmp
}

define i32 @main() {
entry:
  %x = alloca i32, i8 0, align 4
  store i32 1, i32* %x, align 4
  %y = alloca float, i8 0, align 4
  store float 1.000000e+00, float* %y, align 4
  %id_load_tmp = load i32, i32* %x, align 4
  %id_load_tmp1 = load float, float* %y, align 4
  %flt_to_si = fptosi float %id_load_tmp1 to i32
  %int_cmp_eq = icmp eq i32 %id_load_tmp, %flt_to_si
  br i1 %int_cmp_eq, label %iftrue, label %else

iftrue:                                           ; preds = %entry
  call void @printBool(i1 true)
  br label %if_conv

else:                                             ; preds = %entry
  br label %if_conv

if_conv:                                          ; preds = %else, %iftrue
  %id_load_tmp2 = load i32, i32* %x, align 4
  %id_load_tmp3 = load float, float* %y, align 4
  %flt_to_si4 = fptosi float %id_load_tmp3 to i32
  %int_cmp_eq5 = icmp eq i32 %id_load_tmp2, %flt_to_si4
  br i1 %int_cmp_eq5, label %iftrue6, label %else7

iftrue6:                                          ; preds = %if_conv
  call void @printBool(i1 true)
  br label %if_conv8

else7:                                            ; preds = %if_conv
  br label %if_conv8

if_conv8:                                         ; preds = %else7, %iftrue6
  ret i32 0
}
