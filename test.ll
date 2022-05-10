; ModuleID = 'test'
source_filename = "test"

@anon_str = private unnamed_addr constant [5 x i8] c"%d\0A\00\00", align 1
@anon_str.1 = private unnamed_addr constant [5 x i8] c"%f\0A\00\00", align 1
@anon_str.2 = private unnamed_addr constant [6 x i8] c"yay!\00\00", align 1
@anon_str.3 = private unnamed_addr constant [8 x i8] c"yay 2!\00\00", align 1
@anon_str.4 = private unnamed_addr constant [5 x i8] c"no!\00\00", align 1

declare i32 @printf(i8*, ...)

define void @printInt(i32 %v) {
entry:
  %0 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str, i32 0, i32 0), i32 %v)
  ret void
}

define void @printDouble(double %v) {
entry:
  %0 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str.1, i32 0, i32 0), double %v)
  ret void
}

define double @printFloat(float %f) {
entry:
  %val = alloca double, i8 0, align 8
  %flt_upcast = fpext float %f to double
  store double %flt_upcast, double* %val, align 8
  %id_load_tmp = load double, double* %val, align 8
  ret double %id_load_tmp
}

define void @print(i8* %str) {
entry:
  %0 = call i32 (i8*, ...) @printf(i8* %str)
  ret void
}

define double @circumference(double %radius) {
entry:
  %flt_multmp = fmul double 0x401921FB4D12D84A, %radius
  ret double %flt_multmp
}

define double @circumference.1(float %radius) {
entry:
  %flt_upcast = fpext float %radius to double
  %flt_multmp = fmul double 0x401921FB4D12D84A, %flt_upcast
  ret double %flt_multmp
}

define float @circumference.2(float %radius) {
entry:
  %flt_multmp = fmul float 0x401921FB40000000, %radius
  ret float %flt_multmp
}

define i32 @main() {
entry:
  br i1 false, label %iftrue, label %else

iftrue:                                           ; preds = %entry
  %0 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @anon_str.2, i32 0, i32 0))
  br label %if_end

else:                                             ; preds = %entry
  br i1 false, label %iftrue3, label %else2

if_end:                                           ; preds = %iftrue
  br label %if_end1

iftrue3:                                          ; preds = %else
  %1 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([8 x i8], [8 x i8]* @anon_str.3, i32 0, i32 0))
  br label %if_end1

else2:                                            ; preds = %else
  %2 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @anon_str.4, i32 0, i32 0))
  br label %if_end1

if_end1:                                          ; preds = %if_end, %else2, %iftrue3
  ret i32 0
}

