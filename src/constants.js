export const LANGUAGE_VERSIONS = {

  python: "3.12.0",     // Latest Python 3 version
  java: "21.0.2",       // Latest Java version
  c: "17",             // Latest C standard (GCC)
  cpp: "20",            // Latest C++ standard (GCC)
  javascript: "20.10.0", // Latest Node.js version
};

export const CODE_SNIPPETS = {
 
  python: `def greet(name):\n  print("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}\n`,
  c: `#include <stdio.h>\n\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}\n`,
  cpp: `#include <iostream>\n\nint main() {\n  std::cout << "Hello, World!" << std::endl;\n  return 0;\n}\n`, javascript: `function greet(name) {\n  console.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`
};