import {
    GitHubBanner,
    Refine,
    AuthBindings,
    Authenticated,
} from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    AuthPage,
    RefineThemes,
} from "@refinedev/antd";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { ConfigProvider, notification } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "../src/pages/posts";
import { supabaseClient } from "../src/utility";
import { AntdInferencer } from "@refinedev/inferencer/antd";

const authProvider: AuthBindings = {
    login: async ({ email, password, providerName }) => {
        // sign in with oauth
        try {
            if (providerName) {
                const { data, error } =
                    await supabaseClient.auth.signInWithOAuth({
                        provider: providerName,
                    });

                if (error) {
                    return {
                        success: false,
                        error,
                    };
                }

                if (data?.url) {
                    return {
                        success: true,
                    };
                }
            }

            // sign in with email and password
            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email,
                    password,
                });

            if (error) {
                return {
                    success: false,
                    error,
                };
            }

            if (data?.user) {
                return {
                    success: true,
                };
            }
        } catch (error: any) {
            return {
                success: false,
                error,
            };
        }

        return {
            success: false,
            error: {
                message: "Login failed",
                name: "Invalid email or password",
            },
        };
    },
    register: async ({ email, password }) => {
        try {
            const { data, error } = await supabaseClient.auth.signUp({
                email,
                password,
            });

            if (error) {
                return {
                    success: false,
                    error,
                };
            }

            if (data) {
                return {
                    success: true,
                };
            }
        } catch (error: any) {
            return {
                success: false,
                error,
            };
        }

        return {
            success: false,
            error: {
                message: "Register failed",
                name: "Invalid email or password",
            },
        };
    },
    forgotPassword: async ({ email }) => {
        try {
            const { data, error } =
                await supabaseClient.auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.origin}/update-password`,
                });

            if (error) {
                return {
                    success: false,
                    error,
                };
            }

            if (data) {
                notification.open({
                    type: "success",
                    message: "Success",
                    description:
                        "Please check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.",
                });
                return {
                    success: true,
                };
            }
        } catch (error: any) {
            return {
                success: false,
                error,
            };
        }

        return {
            success: false,
            error: {
                message: "Forgot password failed",
                name: "Invalid email",
            },
        };
    },
    updatePassword: async ({ password }) => {
        try {
            const { data, error } = await supabaseClient.auth.updateUser({
                password,
            });

            if (error) {
                return {
                    success: false,
                    error,
                };
            }

            if (data) {
                return {
                    success: true,
                    redirectTo: "/",
                };
            }
        } catch (error: any) {
            return {
                success: false,
                error,
            };
        }
        return {
            success: false,
            error: {
                message: "Update password failed",
                name: "Invalid password",
            },
        };
    },
    logout: async () => {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            return {
                success: false,
                error,
            };
        }

        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        try {
            const { data } = await supabaseClient.auth.getSession();
            const { session } = data;

            if (!session) {
                return {
                    authenticated: false,
                    error: {
                        message: "Check failed",
                        name: "Session not found",
                    },
                    logout: true,
                    redirectTo: "/login",
                };
            }
        } catch (error: any) {
            return {
                authenticated: false,
                error: error || {
                    message: "Check failed",
                    name: "Session not found",
                },
                logout: true,
                redirectTo: "/login",
            };
        }

        return {
            authenticated: true,
        };
    },
    getPermissions: async () => {
        const user = await supabaseClient.auth.getUser();

        if (user) {
            return user.data.user?.role;
        }

        return null;
    },
    getIdentity: async () => {
        const { data } = await supabaseClient.auth.getUser();

        if (data?.user) {
            return {
                ...data.user,
                name: data.user.email,
            };
        }

        return null;
    },
};

const items = [
    "copy_v_all_product_list",
    // "v_all_product_list",
    // "v_detail_casing",
    // "v_detail_cpu",
    // "v_detail_gpu",
    // "v_detail_internal_storage",
    // "v_detail_memory",
    // "v_detail_motherboard",
    // "v_detail_psu",
    // "cpus",
    // "cpu_sockets",
    // "cpu_coolers",
    // "motherboards",
    // "casings",
    // "casing_fans",
    // "gpus",
    // "memories",
    // "power_supplies",
    // "internal_storages",
    // "wireless_network_cards",
    // "thermal_pastes",
    // "memory_types",
    // "products",
    // "brands",
    // "pc_builds",
    // "product_details",
    // "motherboard_form_factors",
    // "motherboard_chipsets",
    // "cpu_integrated_gpus",
    // "motherboard_code_name",
    // "categories",
    // "casing_types",
    // "psu_efficiency_ratings",
    // "psu_form_factors"
];

const generatedItems = items.map(item => {
    return {
        name: item,
        list: `/${item}`,
        create: `/${item}/create`,
        edit: `/${item}/edit/:id`,
        show: `/${item}/show/:id`,
        meta: {
            canDelete: true,
            select: "*"
        }
    };
});

console.log(generatedItems);

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    dataProvider={dataProvider(supabaseClient)}
                    liveProvider={liveProvider(supabaseClient)}
                    routerProvider={routerProvider}
                    authProvider={authProvider}
                    resources={[
                        // {
                        //     name: "posts",
                        //     list: "/posts",
                        //     create: "/posts/create",
                        //     edit: "/posts/edit/:id",
                        //     show: "/posts/show/:id",
                        //     meta: {
                        //         canDelete: true,
                        //     },
                        // },
                        ...generatedItems,
                    ]}
                    notificationProvider={notificationProvider}
                    /**
                     * Multiple subscriptions are currently not supported with the supabase JS client v2 and @refinedev/supabase v4.
                     * Therefore, enabling global live mode will cause unexpected behaviors.
                     * Please set `liveMode: "auto"` or `liveMode: "manual"` manually while using real-time features of refine.
                     */
                    options={{
                        liveMode: "off",
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="brands" />
                                }
                            />

                            {/* <Route path="/posts">
                                <Route index element={<PostList />} />
                                <Route path="create" element={<PostCreate />} />
                                <Route path="edit/:id" element={<PostEdit />} />
                                <Route path="show/:id" element={<PostShow />} />
                            </Route> */}

                            {items.map((item) => (
                                <Route path={item}>
                                    <Route index element={<AntdInferencer />} />
                                    <Route
                                        path="show/:id"
                                        element={<AntdInferencer />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<AntdInferencer />}
                                    />
                                    <Route
                                        path="create"
                                        element={<AntdInferencer />}
                                    />
                                </Route>
                            ))}

                            <Route path="/reviews">
                                <Route index element={<AntdInferencer />} />
                                <Route path="create" element={<AntdInferencer />} />
                                <Route path="edit/:id" element={<AntdInferencer />} />
                                <Route path="show/:id" element={<AntdInferencer />} />
                            </Route>
                        </Route>

                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource resource="posts" />
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={
                                    <AuthPage
                                        type="login"
                                        providers={[
                                            {
                                                name: "google",
                                                label: "Sign in with Google",
                                                icon: (
                                                    <GoogleOutlined
                                                        style={{
                                                            fontSize: 18,
                                                            lineHeight: 0,
                                                        }}
                                                    />
                                                ),
                                            },
                                        ]}
                                        formProps={{
                                            initialValues: {
                                                email: "info@refine.dev",
                                                password: "refine-supabase",
                                            },
                                        }}
                                    />
                                }
                            />
                            <Route
                                path="/register"
                                element={<AuthPage type="register" />}
                            />
                            <Route
                                path="/forgot-password"
                                element={<AuthPage type="forgotPassword" />}
                            />
                            <Route
                                path="/update-password"
                                element={<AuthPage type="updatePassword" />}
                            />
                        </Route>

                        <Route
                            element={
                                <Authenticated>
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
