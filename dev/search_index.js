var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = StaticLint","category":"page"},{"location":"#StaticLint","page":"Home","title":"StaticLint","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: Dev) (Image: Project Status: Active - The project has reached a stable, usable state and is being actively developed.) (Image: ) (Image: codecov.io)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Static Code Analysis for Julia","category":"page"},{"location":"#Installation-and-Usage","page":"Home","title":"Installation and Usage","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"using Pkg\nPkg.add(\"StaticLint\")","category":"page"},{"location":"","page":"Home","title":"Home","text":"using StaticLint","category":"page"},{"location":"","page":"Home","title":"Home","text":"Documentation: (Image: Dev)","category":"page"},{"location":"#Description","page":"Home","title":"Description","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package supports LanguageServer.jl functionality broadly by:","category":"page"},{"location":"","page":"Home","title":"Home","text":"linking the file tree of a project\nmarking scopes/namespaces within the syntax tree (ST)\nmarking variable bindings (functions, instances, etc.)\nlinking identifiers (i.e. variable names) to the relevant bindings\nmarking possible errors within the ST","category":"page"},{"location":"","page":"Home","title":"Home","text":"Identifying and marking errors (5.) is, in general, dependent on steps 1-4. These are achieved through a single pass over the ST of a project. A pass over a single EXPR is achieved through calling a State object on the ST. This State requires an AbstractServer that determines how files within a project are loaded and makes packages available for loading.","category":"page"},{"location":"#Passes","page":"Home","title":"Passes","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"For a given experssion x this pass will:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Handle import statements (resolve_import). This either explicitly imports variables into the current state (for statements such as import/using SomeModule: binding1, binding2) or makes the exported bindings of a modules available more generally (e.g. using SomeOtherModule). The availability of includable packages is handled by the getsymbolserver function called on the state.server.\nDetermine whether x introduces a new variable. mark_bindings! performs this and may mark bindings for child nodes of x (e.g. when called on an expression that defines a Function this will mark the arguments of the signature as introducing bindings.)\nAdds any binding associated with x to the variable list of the current scope (add_binding).\nHandles global variables (mark_globals).\nSpecial handling for macros introducing new bindings as necessary, at the moment limited to deprecate, enum, goto, label, and nospecialize.\nAdds new scopes for the interior of x as needed (scopes).\nResolves references for identifiers (i.e. a variable name), macro name, keywords in function signatures and dotted names (e.g. A.B.c). A name is first checked against bindings introduced within a scope then against exported variables of modules loaded into the scope. If this fails to resolve the name this is repeated for the parent scope. References that fail to resolve at this point, and are within a delayed scope (i.e. within a function) are added to a list to be resolved later.\nIf x is a call to include(path_expr) attempt to resolve path_expr to a loadable file from state.server and pass across the files ST (followinclude).\nTraverse across child nodes of x (traverse) in execution order. This means, for example, that in the expression a = b we traverse b then a (ignoring the operator).","category":"page"},{"location":"#Server","page":"Home","title":"Server","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"As mentioned, an AbstractServer is required to hold files within a project and provide access to user installed packages. An implementation must support the following functions:","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.hasfile(server, path)::Bool : Does the server have a file matching the name path.","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.getfile(server, path)::AbstractFile : Retrieves the file path - assumes the server has the file.","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.setfile(server, path, file)::AbstractFile : Stores file in the server under the name path, returning the file.","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.canloadfile(server, path)::Bool : Can the server load the file denoted by path, likely from an external source.","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.loadfile(server, path)::AbstractFile : Load the file at path from an external source (i.e. the hard drive).","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.getsymbolserver(server)::Dict{String,SymbolServer.ModuleStore} : Retrieve the server's depot of loadable packages.","category":"page"},{"location":"","page":"Home","title":"Home","text":"An AbstractFile must support the following:","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.getpath(file) : Retrieve the path of a file.","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.getroot(file) : Retrieve the root of a file. The root is the main/first file in a file structure. For example the StaticLint.jl file is the root of all files (including itself) in src/.","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.setroot(file, root) : Set the root of a file.","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.getcst(file) : Retrieve the cst of a file.","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.setcst(file, cst::CSTParser.EXPR) : Set the cst of a file.","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.getserver(file) : Retrieve the server holding of a file.","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.setserver(file, server::AbstractServer) : Set the server of a file.","category":"page"},{"location":"","page":"Home","title":"Home","text":"StaticLint.semantic_pass(file, target = nothing(optional)) : Run a full pass on the ST of a project (i.e. ST of all linked files). It is expected that file is the root of the project.","category":"page"},{"location":"syntax/#Syntax-Reference","page":"Syntax Reference","title":"Syntax Reference","text":"","category":"section"},{"location":"syntax/","page":"Syntax Reference","title":"Syntax Reference","text":"Modules = [StaticLint]\nPages   = [\"syntax.md\"]","category":"page"},{"location":"syntax/#Main","page":"Syntax Reference","title":"Main","text":"","category":"section"},{"location":"syntax/","page":"Syntax Reference","title":"Syntax Reference","text":"Modules = [StaticLint]\nPages   = readdir(\"../src\")","category":"page"},{"location":"syntax/#StaticLint.followinclude-Tuple{Any,StaticLint.State}","page":"Syntax Reference","title":"StaticLint.followinclude","text":"followinclude(x, state)\n\nChecks whether the arguments of a call to include can be resolved to a path. If successful it checks whether a file with that path is loaded on the server or a file exists on the disc that can be loaded. If this is successful it traverses the code associated with the loaded file.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.get_path-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.get_path","text":"get_path(x::EXPR)\n\nUsually called on the argument to include calls, and attempts to determine the path of the file to be included. Has limited support for joinpath calls.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.semantic_pass","page":"Syntax Reference","title":"StaticLint.semantic_pass","text":"semantic_pass(file, modified_expr=nothing)\n\nPerforms a semantic pass across a project from the entry point file. A first pass traverses the top-level scope after which secondary passes handle delayed scopes (e.g. functions). These secondary passes can be, optionally, very light and only seek to resovle references (e.g. link symbols to bindings). This can be done by supplying a list of expressions on which the full secondary pass should be made (modified_expr), all others will receive the light-touch version.\n\n\n\n\n\n","category":"function"},{"location":"syntax/#StaticLint.traverse-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.traverse","text":"traverse(x, state)\n\nIterates across the child nodes of an EXPR in execution order (rather than storage order) calling state on each node.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.Binding","page":"Syntax Reference","title":"StaticLint.Binding","text":"Bindings indicate that an EXPR may introduce a new name into the current scope/namespace. Struct fields:\n\nname: the EXPR that defines the unqualifed name of the binding.\nval: what the binding points to, either a Binding (indicating ..), EXPR (this is generally the expression that defines the value) or SymStore.\ntype: the type of the binding, either a Binding, EXPR, or SymStore.\nrefs: a list containing all references that have been made to the binding.\n\n\n\n\n\n","category":"type"},{"location":"syntax/#StaticLint.add_binding","page":"Syntax Reference","title":"StaticLint.add_binding","text":"add_binding(x, state, scope=state.scope)\n\nAdd the binding of x to the current scope. Special handling is required for:\n\nmacros: to prefix the @\nfunctions: These are added to the top-level scope unless this syntax is used to define a closure within a function. If a function with the same name already exists in the scope then it is not replaced. This enables the refs list of the Binding of that 'root method' to hold a method table, the name of the new function will resolve to the binding of the root method (to get a list of actual methods -[get_method(ref) for ref in binding.refs if get_method(ref) !== nothing]). For example \n\n[1] f() = 1\n[2] f(x) = 2\n\n[1] is the root method and the name of [2] resolves to the binding of [1]. Functions declared with qualified names require special handling, there are comments in the source.\n\nSome simple type inference is run.\n\n\n\n\n\n","category":"function"},{"location":"syntax/#StaticLint.eventually_overloads-Tuple{StaticLint.Binding,SymbolServer.SymStore,Any}","page":"Syntax Reference","title":"StaticLint.eventually_overloads","text":"eventually_overloads(b, x, server)\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.mark_bindings!-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.mark_bindings!","text":"mark_bindings!(x::EXPR, state)\n\nChecks whether the expression x should introduce new names and marks them as needed. Generally this marks expressions that would introdce names to the current scope (i.e. that x sits in) but in cases marks expressions that will add names to lower scopes. This is done when it is not knowable that a child node of x will introduce a new name without the context of where it sits in x -for example the arguments of the signature of a function definition.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.lint_file","page":"Syntax Reference","title":"StaticLint.lint_file","text":"lint_file(rootpath, server)\n\nRead a file from disc, parse and run a semantic pass over it. The file should be the  root of a project, e.g. for this package that file is src/StaticLint.jl. Other files in the project will be loaded automatically (calls to include with complicated arguments are not handled, see followinclude for details). A FileServer will be returned  containing the Files of the package.\n\n\n\n\n\n","category":"function"},{"location":"syntax/#StaticLint.lint_string","page":"Syntax Reference","title":"StaticLint.lint_string","text":"lint_string(s, server; gethints = false)\n\nParse a string and run a semantic pass over it. This will mark scopes, bindings, references, and lint hints. An annotated EXPR is returned or, if gethints = true, it is paired with a collected list of errors/hints.\n\n\n\n\n\n","category":"function"},{"location":"syntax/#StaticLint.interpret_eval-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.interpret_eval","text":"interpret_eval(x::EXPR, state)\n\nNaive attempt to interpret x as though it has been eval'ed. Lifts any bindings made within the scope of x to the toplevel and replaces (some) interpolated binding names with the value where possible.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.maybe_quoted_list-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"StaticLint.maybe_quoted_list","text":"maybe_quoted_list(x::EXPR)\n\nTry and get a list of quoted symbols from x. Return nothing if not possible.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.initial_pass_on_exports-Tuple{CSTParser.EXPR,Any,Any}","page":"Syntax Reference","title":"StaticLint.initial_pass_on_exports","text":"initial_pass_on_exports(x::EXPR, server)\n\nExport statements need to be (pseudo) evaluated each time we consider  whether a variable is made available by an import statement.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.module_safety_trip-Tuple{StaticLint.Scope,Any}","page":"Syntax Reference","title":"StaticLint.module_safety_trip","text":"module_safety_trip(scope::Scope,  visited_scopes)\n\nChecks whether the scope is a module and we've visited it before,  otherwise adds the module to the list.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.new_within_struct-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"StaticLint.new_within_struct","text":"newwithinstruct(x::EXPR)\n\nChecks whether x is a reference to new within a datatype constructor. \n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.resolve_getfield-Tuple{CSTParser.EXPR,StaticLint.Scope,StaticLint.State}","page":"Syntax Reference","title":"StaticLint.resolve_getfield","text":"resolve_getfield(x::EXPR, parent::Union{EXPR,Scope,ModuleStore,Binding}, state::State)::Bool\n\nGiven an expression of the form parent.x try to resolve x. The method called with parent::EXPR resolves the reference for parent, other methods then check whether the Binding/Scope/ModuleStore to which parent points has a field matching x.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.scope_exports-Tuple{StaticLint.Scope,String,Any}","page":"Syntax Reference","title":"StaticLint.scope_exports","text":"scope_exports(scope::Scope, name::String)\n\nDoes the scope export a variable called name?\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.valofid-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"StaticLint.valofid","text":"valofid(x)\n\nReturns the string value of an expression for which isidentifier is true,  i.e. handles NONSTDIDENTIFIERs.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.addmoduletoscope!-Tuple{StaticLint.Scope,Any,Symbol}","page":"Syntax Reference","title":"StaticLint.addmoduletoscope!","text":"addmoduletoscope!(s, m, [mname::Symbol])\n\nAdds module m to the list of used modules in scope s.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.introduces_scope-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.introduces_scope","text":"introduces_scope(x::EXPR, state)\n\nDoes this expression introduce a new scope?\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.scopehasbinding-Tuple{StaticLint.Scope,String}","page":"Syntax Reference","title":"StaticLint.scopehasbinding","text":"scopehasbinding(s::Scope, n::String)\n\nChecks whether s has a binding for variable named n.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.scopehasmodule-Tuple{StaticLint.Scope,Symbol}","page":"Syntax Reference","title":"StaticLint.scopehasmodule","text":"scopehasmodule(s::Scope, mname::Symbol)::Bool\n\nChecks whether the module mname has been usinged in s.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.scopes-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.scopes","text":"scopes(x::EXPR, state)\n\nCalled when traversing the syntax tree and handles the association of scopes with expressions. On the first pass this will add scopes as necessary, on following passes it empties it. \n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.get_parent_fexpr-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.get_parent_fexpr","text":"get_in_fexpr(x::EXPR, f)\n\nGet the parent of x for which f(parent) == true. (isinfexpr should be called first.)\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.is_in_fexpr-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.is_in_fexpr","text":"is_in_fexpr(x::EXPR, f)\n\nCheck whether x isa the child of an expression for which f(parent) == true.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#Linting","page":"Syntax Reference","title":"Linting","text":"","category":"section"},{"location":"syntax/","page":"Syntax Reference","title":"Syntax Reference","text":"Modules = [StaticLint]\nPages   = readdir(\"../src/linting\")","category":"page"},{"location":"syntax/#StaticLint.check_kw_default-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.check_kw_default","text":"check_kw_default(x::EXPR, server)\n\nCheck that the default value matches the type for keyword arguments. Following types are checked: String, Symbol, Int, Char, Bool, Float32, Float64, UInt8, UInt16, UInt32, UInt64, UInt128.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.collect_hints","page":"Syntax Reference","title":"StaticLint.collect_hints","text":"collect_hints(x::EXPR, server, missingrefs = :all, isquoted = false, errs = Tuple{Int,EXPR}[], pos = 0)\n\nCollect hints and errors from an expression. missingrefs = (:none, :id, :all) determines whether unresolved identifiers are marked, the :all option will mark identifiers used in getfield calls.\"\n\n\n\n\n\n","category":"function"}]
}
